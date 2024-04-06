import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isClient: boolean;

  @ApiProperty()
  employeeId?: number;

  @ApiProperty()
  clientId?: number;
}
