import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  async findAllBills(): Promise<Bill[]> {
    const found = await this.billRepository.find();
    if (!found) {
      throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    }
    return found;
  }

  async saveBill(sentData: CreateBillDto): Promise<Bill> {
    const instance = await this.billRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`주문서를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async deleteBill(id: number): Promise<number> {
    const affectedRowsCnt = (await this.billRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 주문서를 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
