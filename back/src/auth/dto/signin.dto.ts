import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'luca_albrizio@hotmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test!1234' })
  password: string;
}
