import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
export class CreateDeviDto {
  @ApiProperty()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  currentDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  invoiceNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  dateOfIssue: Date;

  

 

  

  @ApiProperty()
  notes?: string;

  @ApiProperty()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  subTotal: number;

  @ApiProperty()
  @IsNotEmpty()
  taxRate: number;

  @ApiProperty()
  @IsNotEmpty()
  taxAmount: number;

  @ApiProperty()

  discountRate?: number;

  @ApiProperty()
  @IsNotEmpty()
  discountAmount: number;

  @ApiProperty()
  @IsArray()
  items:Item[]

  @ApiProperty()
  @IsNotEmpty()
  clientId: number;
}


class Item {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}