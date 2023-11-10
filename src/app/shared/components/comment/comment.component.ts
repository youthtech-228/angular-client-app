import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormArray, FormGroup, Validators} from '@angular/forms';

/**
 * The component to display and edit a AuditMessageComment.
 */
@Component({
   selector: 'app-comment',
   templateUrl: './comment.component.html',
   styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges {
   @Input() commentForm: FormGroup;
   @Input() replyRequired: boolean;
   @ViewChild('commentInput') commentInput: ElementRef;
   public isEditing = false;
   public hasFocus = false;

   @HostListener('document:click', ['$event'])
   clickAway(event) {
      // Must already have focus or the original click of the reply button will turn off editing.
      if (this.hasFocus && !this.eRef.nativeElement.contains(event.target)) {
         this.isEditing = !this.commentForm.valid;
      }
   }

   constructor(private eRef: ElementRef) {
   }

   getRef(): ElementRef {
      return this.eRef;
   }

   /**
    * Initialize the component.
    */
   ngOnInit(): void {
      // The component will start in the editing mode if the comment is new and it has no text.
      this.isEditing = this.commentForm.value.id === 0 && !this.commentForm.value.text;

      // Set focus on the input if editing.
      if (this.isEditing) {
         setTimeout(() => {
            this.commentInput.nativeElement.focus();
         }, 0);
      }
   }

   /**
    * Start editing the comment, if this is a new comment. Existing comments are not editable.
    */
   public handleStartEditing() {
      // Don't allow editing of existing comments.
      if (this.commentForm.value.id === 0) {
         this.isEditing = true;

         setTimeout(() => {
            this.commentInput.nativeElement.focus();
         }, 0);
      }
   }

   /**
    * Handle stop editing. The editing is only ended if the data is valid. If the comment is empty delete it.
    */
   public handleEndEditing() {
      if (this.commentForm.valid) {
         this.isEditing = false;
         this.hasFocus = false;

         // If blank, remove the comment.
         if (!this.commentForm.value.text) {
            const parent = <FormArray>this.commentForm.parent;
            for (let i = 0; i < parent.length; i++) {
               const control = parent.at(i);
               if (control === this.commentForm) {
                  parent.removeAt(i);
               }
            }
         }
      }
   }

   /**
    * When the component changes replyRequired, make the text control required or not required.
    * @param changes
    */
   public ngOnChanges(changes: SimpleChanges): void {
      if (changes?.replyRequired) {
         if (changes?.replyRequired?.currentValue === false && changes?.replyRequired?.previousValue === true) {
            const textControl = this.commentForm.get('text');
            textControl.clearValidators();
            textControl.updateValueAndValidity();
            this.handleEndEditing();
         } else if (changes?.replyRequired?.currentValue === true && changes?.replyRequired?.previousValue === false) {
            const textControl = this.commentForm.get('text');
            textControl.setValidators([Validators.required]);
            textControl.updateValueAndValidity();
         }
      }
   }
}
