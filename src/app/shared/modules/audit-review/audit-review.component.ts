import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-review',
  templateUrl: './audit-review.component.html',
  styleUrls: ['./audit-review.component.scss']
})
export class AuditReviewComponent implements OnInit {
  public instruction: string = `Below is a summary of all information your company has completed throughout this audit process. Please review all
  information. If there is a section that you need to modify, please click on that specific step and you will be
  directed to that section where you can make the modification. Once you feel your audit is complete and is ready
  for NCMS review, click the “Complete” button in the bottom right hand corner. Once your audit has been
  successfully sent to NCMS for review, you will receive a confirmation statement. Once NCMS reviews your audit, you
  will receive notification via email which will provide you with further detail regarding your audit. To keep track
  of the status of this audit, you can revisit this page which will provide you with the current audit status.`
  constructor() { }

  ngOnInit(): void {
  }

}
