import { Body, Controller, Get, Post } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';
import { AppService, StatusResponse } from './app.service';

export class MessageDto {
  @IsString()
  Some: string;
}

export class ValidateDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  foo: number;

  @IsNotEmpty()
  bar: string;

  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  message: MessageDto;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getServiceStatus(): StatusResponse {
    return this.appService.getStatus();
  }

  @Post('notify')
  postValidate(@Body() validateDto: ValidateDto): any {
    console.log(validateDto);
    return validateDto;
  }
}
