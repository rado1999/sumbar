import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReportDto } from './dto/report.dto'
import { Report } from './entities/report.entity'

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepo: Repository<Report>
    ) {}

    async createReport(data: CreateReportDto): Promise<void> {
        const report = this.reportRepo.create(data)
        await this.reportRepo.save(report)
    }
}
