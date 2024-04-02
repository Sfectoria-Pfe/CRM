import { PartialType } from '@nestjs/swagger';
import { CreateOpportuniteDto } from './create-opportunite.dto';

export class UpdateOpportuniteDto extends PartialType(CreateOpportuniteDto) {
    title: string;
      
    client: string;
    email: string;
    
    tel: number;

    
    revenus_esperes: number;
    
    probabilite: number;

    commercial: string;

    date_estimation: string;
    etiquette: string;

   
    equipeCommercialeId: number;
   
    stageId             :number;
}

