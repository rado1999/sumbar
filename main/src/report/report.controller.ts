import { Body, Controller, Post } from '@nestjs/common'
import { CreateReportDto } from './dto/report.dto'
import { ReportService } from './report.service'

@Controller('report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService
    ) { }

    @Post()
    async createReport(@Body() data: CreateReportDto): Promise<void> {
        return this.reportService.createReport(data)
    }
}
