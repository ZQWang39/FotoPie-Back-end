// import { Test } from "@nestjs/testing";
// import { DownloadService } from "./download.service";
// import { ConfigService } from "@nestjs/config";
// import { getModelToken } from "@nestjs/mongoose";
// import { Subscription } from "../subscription/schemas/subscription.schema";

// describe("DownloadService", () => {
//   let downloadService: DownloadService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       providers: [
//         DownloadService,
//         ConfigService,
//         {
//           provide: getModelToken(Subscription.name),
//           useValue: {}, // You can use a mock implementation of the Subscription model here.
//         },
//       ],
//     }).compile();

//     downloadService = moduleRef.get<DownloadService>(DownloadService);
//   });

//   describe("isWithinOneMonth", () => {
//     it("should return true if the date is within one month", () => {
//       const dateWithinOneMonth = new Date();
//       dateWithinOneMonth.setDate(dateWithinOneMonth.getDate() - 15);
//       expect(downloadService.isWithinOneMonth(dateWithinOneMonth)).toBeTruthy();
//     });

//     it("should return false if the date is more than one month ago", () => {
//       const dateMoreThanOneMonth = new Date();
//       dateMoreThanOneMonth.setMonth(dateMoreThanOneMonth.getMonth() - 2);
//       expect(
//         downloadService.isWithinOneMonth(dateMoreThanOneMonth)
//       ).toBeFalsy();
//     });
//   });
// });
////////////////////////////////////////////////////////
import { Test } from "@nestjs/testing";
import { DownloadService } from "./download.service";
import { ConfigService } from "@nestjs/config";
import { getModelToken } from "@nestjs/mongoose";
import { Subscription } from "../subscription/schemas/subscription.schema";
import { NotFoundException } from "@nestjs/common";

const mockSubscriptionModel = () => ({
  findOne: jest.fn(),
});

describe("DownloadService", () => {
  let downloadService: DownloadService;
  let subscriptionModel: ReturnType<typeof mockSubscriptionModel>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DownloadService,
        ConfigService,
        {
          provide: getModelToken(Subscription.name),
          useFactory: mockSubscriptionModel,
        },
      ],
    }).compile();

    downloadService = moduleRef.get<DownloadService>(DownloadService);
    subscriptionModel = moduleRef.get(getModelToken(Subscription.name));
    subscriptionModel.findOne.mockReset();
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

//   describe("findSubscriptionByEmail", () => {
//     it("should return the subscription if found", async () => {
//       const testEmail = "test@example.com";
//       const testSubscription = new Subscription();
//       testSubscription.customer_email = testEmail;

//       const subscriptionModel = moduleRef.get(getModelToken(Subscription.name));
//       subscriptionModel.findOne.mockResolvedValue(testSubscription);

//       const foundSubscription = await downloadService.findSubscriptionByEmail(
//         testEmail
//       );
//       expect(foundSubscription).toEqual(testSubscription);
//       expect(subscriptionModel.findOne).toHaveBeenCalledWith({
//         customer_email: testEmail,
//       });
//     });

//     it("should throw a NotFoundException if the subscription is not found", async () => {
//       const testEmail = "test@example.com";

//       // const subscriptionModel = moduleRef.get(getModelToken(Subscription.name));
//       const subscriptionModel = moduleRef.get(getModelToken(Subscription.name));
// subscriptionModel.findOne.mockReset();

//       subscriptionModel.findOne.mockResolvedValue(null);

//       await expect(
//         downloadService.findSubscriptionByEmail(testEmail)
//       ).rejects.toThrow(NotFoundException);
//       expect(subscriptionModel.findOne).toHaveBeenCalledWith({
//         customer_email: testEmail,
//       });
//     });
//   });
});
