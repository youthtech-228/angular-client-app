import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment, DeleteComment} from '../../../../models/dtos';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../core/auth.service';
import {DataService} from '../../../../services/data.service';

@Component({
   selector: 'app-internal-comment',
   templateUrl: './internal-comment.component.html',
   styleUrls: ['./internal-comment.component.scss']
})
export class InternalCommentComponent implements OnInit {
   @Input() module: string;
   @Input() comment: Comment;
   @Input() commentListForm: FormArray;
   @Output() delete: EventEmitter<any> = new EventEmitter();

   @ViewChild('commentInput') commentInput: ElementRef;

   commentForm: FormGroup;
   isEditing = false;
   public hasFocus = false;

   constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder,
      private dataService: DataService, private authService: AuthService) {
   }

   ngOnInit(): void {
      this.initializeCommentForm(this.comment);
      this.isEditing = !this.comment?.id;

      // Set focus on the input if editing.
      if (this.isEditing) {
         setTimeout(() => {
            this.commentInput.nativeElement.focus();
         }, 0);
      }

   }

   initializeCommentForm(comment) {
      const user = this.authService.getUser();

      this.commentForm = this.formBuilder.group({
         id: [comment?.id || 0],
         type: [comment?.type],
         module: [this.module],
         username: [comment?.username || user.username],
         first_name: [comment?.first_name || user.firstname],
         last_name: [comment?.last_name || user.lastname],
         date_time: [comment?.date_time || new Date()],
         archivedDate: [comment?.archivedDate],
         body: [comment?.body, Validators.required],
      });
      this.commentListForm.push(this.commentForm);
   }

   public handleEdit() {
      this.isEditing = true;
   }

   public async handleDelete() {
      if (this.comment?.id) {
         // @ts-ignore
         await this.dataService.getClient().delete(new DeleteComment({id: this.comment.id}));
      }
      this.delete.emit(this.comment);
   }

   public handleEndEditing() {
      this.isEditing = false;

      // If blank, remove the message .
      if (!this.commentForm.value.body) {
         const parent = <FormArray>this.commentForm.parent;
         for (let i = 0; i < parent.length; i++) {
            const control = parent.at(i);
            if (control === this.commentForm) {
               parent.removeAt(i);
            }
         }
         this.changeDetector.detectChanges();
      }
   }

   public handleArchive() {
      this.commentForm.markAsDirty();
      this.commentForm.patchValue({archivedDate: new Date()});
   }

   public handleUnarchive() {
      this.commentForm.markAsPristine();
      this.commentForm.patchValue({archivedDate: undefined});
      this.changeDetector.detectChanges();
   }
}
