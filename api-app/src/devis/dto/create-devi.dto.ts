import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
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
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty()
  @IsNotEmpty()
  nom_entreprise: string;

  @ApiProperty()
  @IsNotEmpty()
  email_entreprise: string;

  @ApiProperty()
  @IsNotEmpty()
  adresse_entreprise: string;

  @ApiProperty()
  @IsNotEmpty()
  telephone_entreprise: string;

  @ApiProperty()
  @IsNotEmpty()
  notes: string;

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
  @IsNotEmpty()
  discountRate: number;

  @ApiProperty()
  @IsNotEmpty()
  discountAmount: number;

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

  @ApiProperty()
  @IsNotEmpty()
  clientId: number;
}