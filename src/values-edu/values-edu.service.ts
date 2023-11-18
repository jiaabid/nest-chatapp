import { Injectable } from '@nestjs/common';
import { CreateValuesEduDto } from './dto/create-values-edu.dto';
import { UpdateValuesEduDto } from './dto/update-values-edu.dto';

@Injectable()
export class ValuesEduService {
  create(createValuesEduDto: CreateValuesEduDto) {
    return 'This action adds a new valuesEdu';
  }

  findAll() {
    return `This action returns all valuesEdu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} valuesEdu`;
  }

  update(id: number, updateValuesEduDto: UpdateValuesEduDto) {
    return `This action updates a #${id} valuesEdu`;
  }

  remove(id: number) {
    return `This action removes a #${id} valuesEdu`;
  }
}
