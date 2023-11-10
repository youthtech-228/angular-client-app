import { Component, OnInit, ViewChild } from '@angular/core';
import { process } from "@progress/kendo-data-query";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import {Modal} from 'bootstrap';
import {User} from '../../models/dtos';
import {DataService} from "../../services/data.service"
import {AuthService} from '../../../core/auth.service';
@Component({
   selector: 'app-employee-selection',
   templateUrl: './employee-selection.component.html',
   styleUrls: ['./employee-selection.component.scss']
})
export class EmployeeSelectionComponent implements OnInit {
   public unListedEmployees = []
   public editEmployee = {
       id: '',
       firstName: '',
       lastName: '',
   }
   public employeesForValidation: any[] = [];
   public eename: string ="";
   @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
   public gridData: any[] = [];
   public gridView: any[];
   public selectedEmployee: string[] = [];
   public uploadSaveUrl: any;
   public uploadRemoveUrl: any;
   public backgroundCheck: any = true;
   public otherDocument: any;
   public thirdOne: any;

   constructor(private dataService: DataService, private authService: AuthService) {}

   async ngOnInit(): Promise<void> {
    const result = await Promise.all([
        this.dataService.getEmployeeValidations(),
        this.dataService.getEmployees()
    ])
    const validations = result[0].results
    const employees = result[1].results
    validations.forEach(validation => {
        const employee = employees.filter( el => validation.employeeId == el.id )
        
        if(employee.length > 0)
        {
            let name = employee[0].first_name != undefined ? employee[0].first_name : ""
            name += employee[0].last_name != undefined ? employee[0].last_name : ""
            this.gridData.push({
                id: validation.id,
                employeeId: validation.employeeId,
                ncms_id: employee[0].ncms_id,
                requested_date: validation.requested_date,
                name: name,
                status: validation.status,
                last4_empid: employee[0].last4_empid
            })
        }
    });
    this.gridView = this.gridData
   }
   public onFilter(inputValue: string): void {
       this.gridView = process(this.gridData, {
           filter: {
               logic: "or",
               filters: [
                   {
                       field: 'name',
                       operator: 'contains',
                       value: inputValue
                   },
                   {
                    field: 'last4_empid',
                    operator: 'contains',
                    value: inputValue
                },
               ],
           }
       }).data;

       this.dataBinding.skip = 0;
   }

   private photoURL(dataItem: any): string {
      return ''
  }

  private flagURL(dataItem: any): string {
      return ''
  }

   public onDeleteUnlistedEmployee(employee)
   {
       console.log(employee)
       console.log(this.unListedEmployees)
       this.unListedEmployees = this.unListedEmployees.filter( el => el.id != employee.id)
   }
   handleShowModal()
   {
    this.editEmployee = { id: '', firstName: '', lastName: ''}
    const myModalEl = document.getElementById('modalAddEmployee');
    const modal = new Modal(myModalEl);
    modal.show()
   }
   
   handleGridSelection({selectedRows, deselectedRows})
   {
       selectedRows.forEach(el => {
           this.employeesForValidation.push(el)
       });
       deselectedRows.forEach(element => {
        this.employeesForValidation = this.employeesForValidation.filter(el => el.dataItem.id != element.dataItem.id)    
       });
   }

   handleAddEmployee()
   {
        const employeeForStore = {
            ncms_id: 1,
            first_name: this.editEmployee.firstName,
            last_name: this.editEmployee.lastName,
            last4_empid: this.editEmployee.id,
        }
        this.dataService.storeEmployee(employeeForStore)
        .then((res) => {
            this.unListedEmployees.push({
                id: res.id,
                name: res.first_name + ' ' + res.last_name,
            })
        })
   }

   handleValidationSubmit()
   {   
        let validationRequests = []
        this.employeesForValidation.forEach( async (el) => {
            validationRequests.push(
                new Promise( async (resolve, reject) => {
                    const employee = {
                        id: el.dataItem.id,
                        status: 'ValidationRequested',
                    }
                    this.dataService.validateEmployee(employee)
                    .then(() => resolve({}))
                })
            )
        })
        Promise.all(validationRequests)
        .then(() => this.employeesForValidation = [])
   }
}