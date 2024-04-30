import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateServiceDetailDto {

    @ApiProperty()

      imageURL    :string 
      @ApiProperty()
    @IsNotEmpty()
      title:string;
      @ApiProperty()
    @IsNotEmpty() 
  description :string
  @ApiProperty()
    @IsNotEmpty()
  address     :string
  @ApiProperty()
    
  price       :number
  @ApiProperty()
    @IsNotEmpty()
  serviceId   :number
}
