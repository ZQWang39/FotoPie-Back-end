import {
  Controller,
  Post,
  Param,
  Req,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";

import { ImageQualityDto } from "./dto/image-quality.dto";
import { QualityService } from "./image-quality.service";
import { Quality, QualityDocument } from "./schema/image-quality.schema";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";

@Controller("quality")
export class QualityController {
  constructor(private readonly collectService: QualityService) { }

  // @UseGuards(JwtAuthGuard)
  // @Post(":filename")
  // @HttpCode(HttpStatus.CREATED)
}