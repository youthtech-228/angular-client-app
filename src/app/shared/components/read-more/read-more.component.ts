import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';

declare var $: any;

@Component({
   selector: 'app-read-more',
   templateUrl: './read-more.component.html',
   styleUrls: ['./read-more.component.scss'],
})
export class ReadMoreComponent implements AfterViewInit {
   public isOverflow: any = false;
   @Input() childName: string;
   @ViewChild('collapsePanel') collapsePanel: ElementRef;

   constructor(private changeDetector: ChangeDetectorRef) {
   }

   ngAfterViewInit(): void {
      this.isOverflow = (this.collapsePanel.nativeElement.offsetWidth < this.collapsePanel.nativeElement.scrollWidth ||
         this.collapsePanel.nativeElement.offsetHeight < this.collapsePanel.nativeElement.scrollHeight);
      this.changeDetector.detectChanges();
   }
}
