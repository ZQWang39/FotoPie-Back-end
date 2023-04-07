import { Test } from "@nestjs/testing";
import { DownloadService } from "./download.service";
import { ConfigService } from "@nestjs/config";
import { getModelToken } from "@nestjs/mongoose";
import { Subscription } from "../subscription/schemas/subscription.schema";
import { NotFoundException } from "@nestjs/common";

describe("DownloadService", () => {
  let downloadService: DownloadService;
  let subscriptionModel: any;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DownloadService,
        ConfigService,
        {
          provide: getModelToken(Subscription.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    downloadService = moduleRef.get<DownloadService>(DownloadService);
    subscriptionModel = moduleRef.get(getModelToken(Subscription.name));
  });

  describe("isWithinOneMonth", () => {
    it("should return true if the date is within one month", () => {
      const dateWithinOneMonth = new Date();
      dateWithinOneMonth.setDate(dateWithinOneMonth.getDate() - 15);
      expect(downloadService.isWithinOneMonth(dateWithinOneMonth)).toBeTruthy();
    });

    it("should return false if the date is more than one month ago", () => {
      const dateMoreThanOneMonth = new Date();
      dateMoreThanOneMonth.setMonth(dateMoreThanOneMonth.getMonth() - 2);
      expect(
        downloadService.isWithinOneMonth(dateMoreThanOneMonth)
      ).toBeFalsy();
    });
  });

  describe("findSubscriptionByEmail", () => {
    it("should return the subscription if found", async () => {
      const mockSubscription = new Subscription();
      mockSubscription.customer_email = "test@example.com";
      subscriptionModel.findOne.mockResolvedValue(mockSubscription);

      const result = await downloadService.findSubscriptionByEmail(
        "test@example.com"
      );
      expect(result).toEqual(mockSubscription);
    });

    it("should throw a NotFoundException if no subscription found", async () => {
      subscriptionModel.findOne.mockResolvedValue(null);

      await expect(
        downloadService.findSubscriptionByEmail("test@example.com")
      ).rejects.toThrow(NotFoundException);
    });
  });
});
