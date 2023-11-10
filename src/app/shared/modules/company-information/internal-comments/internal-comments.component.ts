import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {JsonClientService} from '../../../services/json-client.service';
import {NotificationStyledService} from '../../../services/notification-styled.service';
import {AuditService} from '../../../services/audit.service';
import {DataService} from '../../../services/data.service';
import {Comment, FindComment, StoreComment, UpdateComment} from '../../../models/dtos';
import {AuthService} from '../../../../core/auth.service';
import {pullAllBy} from 'lodash-es';

@Component({
   selector: 'app-internal-comments',
   templateUrl: './internal-comments.component.html',
   styleUrls: ['./internal-comments.component.scss'],
})
export class InternalCommentsComponent implements OnInit {
   @Input() module: string;
   @Input() companyAllForm: FormGroup;

   commentListForm: FormArray;
   comments: Comment[];

   public hasFocus = false;

   constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder,
      private jsonService: JsonClientService,
      private notificationStyledService: NotificationStyledService, private auditService: AuditService,
      private dataService: DataService, private authService: AuthService) {
   }

   ngOnInit() {
      this.dataService.getClient().get(new FindComment(), {module: this.module, archivedDate: null}).then((results) => {
         this.comments = results?.results;
      }).catch((e) => {
         console.log(e);
         this.notificationStyledService.showError({content: 'Could not load the internal comments.'});
      });

      this.commentListForm = new FormArray([]);
      this.companyAllForm.addControl('internalComments', this.commentListForm);
   }

   public isAuditor() {
      return this.authService.isAuditor();
   }

   /**
    * Handle adding a new comment.
    */
   public handleAddNewComment() {
      const user = this.authService.getUser();

      this.comments.push(new Comment({
         ncms_id: this.authService.getNcmsId(), username: user.username, first_name: user.firstname,
         last_name: user.lastname, module: this.module, date_time: (new Date()).toLocaleDateString()
      }));
   }

   public async save() {
      if (this.commentListForm?.dirty) {
         const controls = this.commentListForm.controls;
         for (const commentsForm of controls) {
            await this.saveComment(commentsForm);
         }
      }
   }

   async saveComment(commentForm: AbstractControl) {
      if (commentForm?.dirty) {
         try {
            let result;

            if (commentForm.value?.id) {
               result = await this.dataService.getClient().put(new UpdateComment(commentForm.value));
            } else {
               result = await this.dataService.getClient().post(new StoreComment(commentForm.value));
            }
            commentForm.reset(result);
            commentForm.markAsPristine();
         } catch (e) {
            console.log(e);
            this.notificationStyledService.showError({content: 'Could not save the comment.'});
         }
      }
   }

   public handleDelete($event: any) {
      pullAllBy(this.comments, [$event], 'id');
   }
}
