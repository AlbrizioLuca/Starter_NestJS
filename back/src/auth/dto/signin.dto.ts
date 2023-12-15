import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'pierre_leroux@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1MotdePasse?' })
  password: string;
}
