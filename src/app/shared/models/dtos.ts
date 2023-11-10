/* Options:
Date: 2021-07-15 21:03:18
Version: 5.110
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5001

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId: string;
}

export interface IHasBearerToken
{
    bearerToken: string;
}

export interface IPost
{
}

export enum AuditMessageTemplateStatusEnum
{
    PendingApproval = 'PendingApproval',
    Approved = 'Approved',
}

export enum EmployeeValidationStatusEnum
{
    Incomplete = 'Incomplete',
    New = 'New',
    ValidationRequested = 'ValidationRequested',
    PendingReview = 'PendingReview',
    Complete = 'Complete',
}

export enum EmployeeValidationFileType
{
    DrugTest = 'DrugTest',
    AlcoholTest = 'AlcoholTest',
    Identification = 'Identification',
    Other = 'Other',
}

export enum EmployeeValidationFileStatus
{
    Pending = 'Pending',
    Accepted = 'Accepted',
    NeedsInformation = 'NeedsInformation',
    Archived = 'Archived',
}

export enum NotificationReceiver
{
    Contractor = 'Contractor',
    Auditor = 'Auditor',
    Operator = 'Operator',
}

export enum NotificationType
{
    AuditComplete = 'AuditComplete',
    AuditUpdate = 'AuditUpdate',
    AuditOpen = 'AuditOpen',
    ContractorReply = 'ContractorReply',
    OperatorReply = 'OperatorReply',
    AuditorReply = 'AuditorReply',
}

export enum NotificationSenderType
{
    Auditor = 'Auditor',
    Contractor = 'Contractor',
    Operator = 'Operator',
}

// @DataContract
export class QueryBase
{
    // @DataMember(Order=1)
    public skip?: number;

    // @DataMember(Order=2)
    public take?: number;

    // @DataMember(Order=3)
    public orderBy: string;

    // @DataMember(Order=4)
    public orderByDesc: string;

    // @DataMember(Order=5)
    public include: string;

    // @DataMember(Order=6)
    public fields: string;

    // @DataMember(Order=7)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<QueryBase>) { (Object as any).assign(this, init); }
}

export class QueryDb<T> extends QueryBase
{

    public constructor(init?: Partial<QueryDb<T>>) { super(init); (Object as any).assign(this, init); }
}

export class BaseNCMSProgram
{
    public id: number;
    public ncms_id: string;

    public constructor(init?: Partial<BaseNCMSProgram>) { (Object as any).assign(this, init); }
}

export enum HelpContentVersionStatus
{
    PendingApproval = 'PendingApproval',
    Approved = 'Approved',
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class AddlInfoAnswer extends BaseNCMSProgram
{
    public type: string;
    public module: string;
    public body: string;

    public constructor(init?: Partial<AddlInfoAnswer>) { super(init); (Object as any).assign(this, init); }
}

export class AddlInfoQuestion extends BaseNCMSProgram
{
    public type: string;
    public module: string;
    public body: string;

    public constructor(init?: Partial<AddlInfoQuestion>) { super(init); (Object as any).assign(this, init); }
}

export class AuditMessage extends BaseNCMSProgram
{
    public field_name: string;
    public field_id: string;
    public module: string;
    public object_name: string;
    public object_field: string;
    public notification_status: string;
    public notification_sent_date?: string;
    public status: string;
    public message_text: string;
    public created_date: string;
    public created_by: string;
    public comments: string;
    public type: string;
    public contractor_read_date?: string;
    public admin_read_date?: string;

    public constructor(init?: Partial<AuditMessage>) { super(init); (Object as any).assign(this, init); }
}

export class AuditMessageComment extends BaseNCMSProgram
{
    public audit_message_id: number;
    public text: string;
    public created_date: string;
    public created_by: string;
    public notification_status: string;
    public notification_sent_date?: string;
    public is_acknowledged: boolean;
    public acknowledged_date?: string;
    // @Ignore()
    public auditMessage: AuditMessage;

    public auditMessageId: number;

    public constructor(init?: Partial<AuditMessageComment>) { super(init); (Object as any).assign(this, init); }
}

export class AuditMessageTemplate extends BaseNCMSProgram
{
    public name: string;
    public version: number;
    public moduleId: string;
    public fieldId: string;
    public validUntil?: string;
    public status: AuditMessageTemplateStatusEnum;
    public type: string;

    public constructor(init?: Partial<AuditMessageTemplate>) { super(init); (Object as any).assign(this, init); }
}

export class AuditMessageTemplateVersion extends BaseNCMSProgram
{
    public text: string;
    public isActive: boolean;
    // @Ignore()
    public auditMessageTemplate: AuditMessageTemplate;

    public auditMessageTemplateId: number;

    public constructor(init?: Partial<AuditMessageTemplateVersion>) { super(init); (Object as any).assign(this, init); }
}

export class Audit extends BaseNCMSProgram
{
    public start_date?: string;
    public end_date?: string;
    public created_date: string;
    public updated_date?: string;

    public constructor(init?: Partial<Audit>) { super(init); (Object as any).assign(this, init); }
}

export class Comment extends BaseNCMSProgram
{
    public type: string;
    public module: string;
    public username: string;
    public first_name: string;
    public last_name: string;
    public date_time?: string;
    public body: string;
    public archivedDate?: string;

    public constructor(init?: Partial<Comment>) { super(init); (Object as any).assign(this, init); }
}

export class Company
{
    public ncms_id: string;
    public name: string;
    public previous_name: string;
    public dba_name: string;
    public mailing_address: string;
    public mailing_city: string;
    public mailing_state: string;
    public mailing_zip: string;
    public phone: string;
    public federal_id: string;
    public isnid: string;
    public itsid: string;
    public phmsa?: boolean;
    public fmcsa?: boolean;
    public faa?: boolean;
    public uscg?: boolean;
    public fra?: boolean;
    public uses_tpa?: boolean;
    public tpa_name: string;
    public type_of_work: string;
    public employee_awareness_policy_agree?: boolean;
    public employee_awareness_description: string;
    public supervisor_training_acknolwedgement?: boolean;
    public supervisor_training_last_modified?: string;
    public reviewed_operator_guidelines?: boolean;
    public tp_alcohol_s_level: string;
    public tp_alcohol_c_level: string;
    public tp_alcohol_testing_method_ebt?: boolean;
    public tp_alcohol_testing_method_saliva?: boolean;
    public onsite_coc_acknowledgement?: boolean;
    public fp_allow_rtd: string;
    public fp_rtd_process: string;
    public background_check_company_name: string;
    public background_check_company_exception_path: string;
    public follows_findings_approval: string;
    public follows_findings_approval_explanation: string;
    public include_all_checks: string;
    public include_all_checks_explanation: string;
    public mvr: string;
    public mvr_remove_employee: string;
    public update_frequency: string;
    public employee_conviction: string;
    public signed_consent_path: string;
    public mvr_explanation: string;
    public update_frequency_explanation: string;
    public employee_conviction_explanation: string;
    public agree_background_check_requirements?: boolean;
    public tb_required: string;
    public tb_use_model_program: string;
    public tb_policy_meets_requirements?: boolean;
    public tb_policy_file_path: string;
    public tb_policy_company_name: string;
    public tb_policy_approved_by: string;
    public tb_policy_effective_date?: string;
    public tb_last_modified?: string;
    public pre_mobilization_acknowledgement?: boolean;
    public nudge_list: string;

    public constructor(init?: Partial<Company>) { (Object as any).assign(this, init); }
}

export class Contact extends BaseNCMSProgram
{
    public name: string;
    public email: string;
    public phone: string;
    public fax: string;
    public type: string;
    public primary: boolean;

    public constructor(init?: Partial<Contact>) { super(init); (Object as any).assign(this, init); }
}

export class Policy extends BaseNCMSProgram
{
    public action: string;
    public company_name: string;
    public company_address: string;
    public company_phone: string;
    public file_name: string;
    public file_guid: string;
    public file_salt: string;
    public modelPlanId: number;
    // @Ignore()
    public modelPlan: ModelPlan;

    public constructor(init?: Partial<Policy>) { super(init); (Object as any).assign(this, init); }
}

export class CoveredPosition extends BaseNCMSProgram
{
    public job_title: string;
    public job_type: string;
    public modelPlanId: number;
    // @Ignore()
    public modelPlan: ModelPlan;

    public constructor(init?: Partial<CoveredPosition>) { super(init); (Object as any).assign(this, init); }
}

export class ModelPlanTermAgreement extends BaseNCMSProgram
{
    public terms_agreed: string;
    public terms_guid: string;
    public modelPlanId: number;
    // @Ignore()
    public modelPlan: ModelPlan;

    public constructor(init?: Partial<ModelPlanTermAgreement>) { super(init); (Object as any).assign(this, init); }
}

export class ModelPlan extends BaseNCMSProgram
{
    public acknowledged_terms: string;
    public policy_company_name: string;
    public policy_company_address: string;
    public policy_company_phone: string;
    public policy_implementation_date: string;
    public policy_new_effective_date: string;
    public policy_tpa_name: string;
    public policy_tpa_address: string;
    public policy_tpa_phone: string;
    public policy_der_name: string;
    public policy_der_address: string;
    public policy_der_phone: string;
    public policy_samhsa_name: string;
    public policy_samhsa_address: string;
    public policy_samhsa_phone: string;
    public policy_sap_name: string;
    public policy_sap_address: string;
    public policy_sap_phone: string;
    public policy_eap_name: string;
    public policy_eap_address: string;
    public policy_eap_phone: string;
    public policy_mro_name: string;
    public policy_mro_address: string;
    public policy_mro_phone: string;
    // @Ignore()
    public policies_list: Policy[];

    // @Ignore()
    public covered_positions: CoveredPosition[];

    // @Ignore()
    public terms_agreements: ModelPlanTermAgreement[];

    public constructor(init?: Partial<ModelPlan>) { super(init); (Object as any).assign(this, init); }
}

export class CR_GREF_Employee extends BaseNCMSProgram
{
    public type: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public most_recent_drug?: string;
    public most_recent_alcohol?: string;
    public test_type: string;
    public pool_name: string;
    public background_check_date?: string;
    public background_check_company?: string;
    public location: string;

    public constructor(init?: Partial<CR_GREF_Employee>) { super(init); (Object as any).assign(this, init); }
}

export class CR_JobFunction extends BaseNCMSProgram
{
    public selected: boolean;
    public auditVersion: number;
    public jobFunction: string;
    public operatorCode: string;
    public jobDescription: string;

    public constructor(init?: Partial<CR_JobFunction>) { super(init); (Object as any).assign(this, init); }
}

export class CR_Policy extends BaseNCMSProgram
{
    public policy_action: string;
    public policy_company_name: string;
    public policy_addendum_id: string;
    public policy_effective_date?: string;
    public policy_upload_meets_requirements?: boolean;
    public file_path: string;
    public file_name: string;
    public file_guid: string;
    public file_salt: string;
    public uploaded_date?: string;

    public constructor(init?: Partial<CR_Policy>) { super(init); (Object as any).assign(this, init); }
}

export class CR_TB_Policy extends BaseNCMSProgram
{
    public policy_action: string;
    public policy_company_name: string;
    public policy_addendum_id: string;
    public policy_effective_date: string;
    public policy_upload_meets_requirements?: boolean;
    public policy_file_guid: string;
    public uploaded_date?: string;

    public constructor(init?: Partial<CR_TB_Policy>) { super(init); (Object as any).assign(this, init); }
}

export class CR_TestingProtocolLab extends BaseNCMSProgram
{
    public lab_name: string;
    public lab_address: string;
    public lab_city: string;
    public lab_state: string;
    public lab_zip: string;
    public lab_phone: string;
    public samhsa_certified?: boolean;
    public mro_name: string;
    public mro_phone: string;

    public constructor(init?: Partial<CR_TestingProtocolLab>) { super(init); (Object as any).assign(this, init); }
}

export class File extends BaseNCMSProgram
{
    public type: string;
    public path: string;
    public upload_date?: string;
    public salt: string;
    public guid: string;
    public filename: string;
    public size: number;
    public extension: string;

    public constructor(init?: Partial<File>) { super(init); (Object as any).assign(this, init); }
}

export class EmployeeValidationFile extends BaseNCMSProgram
{
    public file_type: EmployeeValidationFileType;
    public upload_date: string;
    public upload_user_id: string;
    public file_location: string;
    public status: EmployeeValidationFileStatus;
    // @Ignore()
    public the_file: File;

    // @Ignore()
    public employeeValidation: EmployeeValidation;

    public employee_validation_id: number;

    public constructor(init?: Partial<EmployeeValidationFile>) { super(init); (Object as any).assign(this, init); }
}

export class EmployeeValidation extends BaseNCMSProgram
{
    public requested_date: string;
    public requestor_user_id: string;
    public validation_type: string;
    public employee_identification: string;
    public completed_date?: string;
    public status: EmployeeValidationStatusEnum;
    public employeeId: number;
    // @Ignore()
    public employeeValidationFiles: EmployeeValidationFile[];

    public constructor(init?: Partial<EmployeeValidation>) { super(init); (Object as any).assign(this, init); }
}

export class Employee extends BaseNCMSProgram
{
    public type: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public most_recent_test?: string;
    public test_type: string;
    public pool_name: string;
    public background_check_complete?: string;
    public background_check_completed_by: string;
    public location: string;
    public tb_date_complete?: string;
    public tb_medical_facility: string;
    public tb_date_added?: string;
    public web_user_name: string;
    public status: EmployeeValidationStatusEnum;
    // @Ignore()
    public employeeValidations: EmployeeValidation[];

    public constructor(init?: Partial<Employee>) { super(init); (Object as any).assign(this, init); }
}

export class HelpContent
{
    public id: number;
    public module_id: string;
    public valid_until?: string;
    public helpContentVersions: HelpContentVersion[];

    public constructor(init?: Partial<HelpContent>) { (Object as any).assign(this, init); }
}

export class HelpContentVersion
{
    public id: number;
    public version_number: number;
    public is_active: boolean;
    public status: HelpContentVersionStatus;
    public valid_until?: string;
    public content: string;
    // @Ignore()
    public helpContent: HelpContent;

    public helpContentId: number;

    public constructor(init?: Partial<HelpContentVersion>) { (Object as any).assign(this, init); }
}

export class HistoryCheckForm extends BaseNCMSProgram
{
    public fileid: number;

    public constructor(init?: Partial<HistoryCheckForm>) { super(init); (Object as any).assign(this, init); }
}

export class MedicalReviewOfficer extends BaseNCMSProgram
{
    public laboratory_address: string;
    public ccf_reviewed_and_signed: string;
    public review_signature_process: string;
    public ccfs_used_for_reporting: string;
    public signed_ccfs_available: string;
    public mro_address: string;
    public mro_colocated: string;
    public physical_separation: string;
    public mro_assistants: string;
    public quality_assurance: string;
    public frequency_of_reviews: string;
    public oversight_assistants: string;
    public hiring: string;
    public substituted?: boolean;
    public refusal?: boolean;
    public adulterated?: boolean;
    public negative?: boolean;
    public confirmed_positive?: boolean;
    public ccf_reviewed_and_signed_explanation: string;
    public mro_qa_explanation: string;
    public mro_hiring_explanation: string;
    public mro_oversight_explanation: string;

    public constructor(init?: Partial<MedicalReviewOfficer>) { super(init); (Object as any).assign(this, init); }
}

export class MessageTemplate extends BaseNCMSProgram
{
    public module_name: string;
    public field_name: string;

    public constructor(init?: Partial<MessageTemplate>) { super(init); (Object as any).assign(this, init); }
}

export class MessageTemplateVersion extends BaseNCMSProgram
{
    public description: string;
    public message_content: string;
    // @Ignore()
    public message_template: MessageTemplate;

    public message_template_id: number;

    public constructor(init?: Partial<MessageTemplateVersion>) { super(init); (Object as any).assign(this, init); }
}

export class NotificationEventRecord extends BaseNCMSProgram
{
    public audit_message_id: number;
    public module: string;
    public field: string;
    public notification_event_id: number;

    public constructor(init?: Partial<NotificationEventRecord>) { super(init); (Object as any).assign(this, init); }
}

export class NotificationEvent extends BaseNCMSProgram
{
    public create_date: string;

    public constructor(init?: Partial<NotificationEvent>) { super(init); (Object as any).assign(this, init); }
}

export class Notification extends BaseNCMSProgram
{
    public receiver: NotificationReceiver;
    public receiveridlist: string;
    public type: NotificationType;
    public sender_type: NotificationSenderType;
    public sender_id: string;
    public body: string;
    public send_time: string;

    public constructor(init?: Partial<Notification>) { super(init); (Object as any).assign(this, init); }
}

export class RandomProcess extends BaseNCMSProgram
{
    public type: string;
    public phmsa?: boolean;
    public fmcsa?: boolean;
    public fra?: boolean;
    public faa?: boolean;
    public uscg?: boolean;
    public tpa_phmsa?: boolean;
    public tpa_fmcsa?: boolean;
    public tpa_fra?: boolean;
    public tpa_faa?: boolean;
    public tpa_uscg?: boolean;
    public fra_drug_precent?: number;
    public fra_alcohol_percent?: number;
    public phmsa_drug_precent?: number;
    public fmcsa_drug_percent?: number;
    public fmcsa_alcohol_percent?: number;
    public faa_drug_percent?: number;
    public faa_alcohol_percent?: number;
    public uscg_drug_percent?: number;
    public selection_frequency: string;
    public consortium_pool: string;
    public alternate_draws: string;
    public alternate_draws_explanation: string;
    public random_draw_documentation: string;
    public random_draws_explanation: string;
    public generator: string;
    public generator_explanation: string;

    public constructor(init?: Partial<RandomProcess>) { super(init); (Object as any).assign(this, init); }
}

export class ReturnToDuty extends BaseNCMSProgram
{
    public saprtd_process: string;
    public saprtd_agree?: boolean;
    public saprtd_explanation: string;
    public saprtd_referral_list?: boolean;

    public constructor(init?: Partial<ReturnToDuty>) { super(init); (Object as any).assign(this, init); }
}

export class Role
{
    public id: string;
    public name: string;
    public permissions: string[];

    public constructor(init?: Partial<Role>) { (Object as any).assign(this, init); }
}

export class StatisticalData extends BaseNCMSProgram
{
    public file_id: number;
    public report_year: number;
    public report_period: number;

    public constructor(init?: Partial<StatisticalData>) { super(init); (Object as any).assign(this, init); }
}

export class Subcontractor extends BaseNCMSProgram
{
    public type: string;
    public company_name: string;
    public contact: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public phone: string;
    public type_of_work: string;
    public operator_list: string;
    public phmsa_job_functions: string;
    public email: string;

    public constructor(init?: Partial<Subcontractor>) { super(init); (Object as any).assign(this, init); }
}

export class Supervisor extends BaseNCMSProgram
{
    public type: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public drug_training_date?: string;
    public alcohol_training_date?: string;

    public constructor(init?: Partial<Supervisor>) { super(init); (Object as any).assign(this, init); }
}

export class TestingForm extends BaseNCMSProgram
{
    public file_id: number;

    public constructor(init?: Partial<TestingForm>) { super(init); (Object as any).assign(this, init); }
}

export class User
{
    public firstname: string;
    public lastname: string;
    public name: string;
    public user_id: string;
    public ncms_id: string;
    public username: string;
    public email: string;
    public isAdmin: boolean;
    public roles: string[];
    public permissions: string[];

    public constructor(init?: Partial<User>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public profileUrl: string;

    // @DataMember(Order=9)
    public roles: string[];

    // @DataMember(Order=10)
    public permissions: string[];

    // @DataMember(Order=11)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=12)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UnAssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryResponse<T>
{
    // @DataMember(Order=1)
    public offset: number;

    // @DataMember(Order=2)
    public total: number;

    // @DataMember(Order=3)
    public results: T[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    // @DataMember(Order=5)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<QueryResponse<T>>) { (Object as any).assign(this, init); }
}

// @Route("/AddlInfoAnswer/{id}", "GET")
export class GetAddlInfoAnswer implements IReturn<AddlInfoAnswer>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAddlInfoAnswer>) { (Object as any).assign(this, init); }
    public createResponse() { return new AddlInfoAnswer(); }
    public getTypeName() { return 'GetAddlInfoAnswer'; }
}

// @Route("/AddlInfoAnswer", "POST")
export class StoreAddlInfoAnswer implements IReturn<AddlInfoAnswer>
{
    public type: string;
    public ncms_id: string;
    public module: string;
    public body: string;

    public constructor(init?: Partial<StoreAddlInfoAnswer>) { (Object as any).assign(this, init); }
    public createResponse() { return new AddlInfoAnswer(); }
    public getTypeName() { return 'StoreAddlInfoAnswer'; }
}

// @Route("/AddlInfoAnswer", "PUT")
export class UpdateAddlInfoAnswer implements IReturn<AddlInfoAnswer>
{
    public id: number;
    public type: string;
    public ncms_id: string;
    public module: string;
    public body: string;

    public constructor(init?: Partial<UpdateAddlInfoAnswer>) { (Object as any).assign(this, init); }
    public createResponse() { return new AddlInfoAnswer(); }
    public getTypeName() { return 'UpdateAddlInfoAnswer'; }
}

// @Route("/AddlInfoAnswer/{id}", "DELETE")
export class DeleteAddlInfoAnswer
{
    public id: number;

    public constructor(init?: Partial<DeleteAddlInfoAnswer>) { (Object as any).assign(this, init); }
}

// @Route("/AddlInfoQuestion/{id}", "GET")
export class GetAddlInfoQuestion implements IReturn<AddlInfoQuestion>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAddlInfoQuestion>) { (Object as any).assign(this, init); }
    public createResponse() { return new AddlInfoQuestion(); }
    public getTypeName() { return 'GetAddlInfoQuestion'; }
}

// @Route("/AddlInfoQuestion", "POST")
export class StoreAddlInfoQuestion implements IReturn<AddlInfoQuestion>
{
    public type: string;
    public ncms_id: string;
    public module: string;
    public body: string;

    public constructor(init?: Partial<StoreAddlInfoQuestion>) { (Object as any).assign(this, init); }
    public createResponse() { return new AddlInfoQuestion(); }
    public getTypeName() { return 'StoreAddlInfoQuestion'; }
}

// @Route("/AddlInfoQuestion", "PUT")
export class UpdateAddlInfoQuestion implements IReturn<AddlInfoQuestion>
{
    public id: number;
    public type: string;
    public ncms_id: string;
    public module: string;
    public body: string;

    public constructor(init?: Partial<UpdateAddlInfoQuestion>) { (Object as any).assign(this, init); }
    public createResponse() { return new AddlInfoQuestion(); }
    public getTypeName() { return 'UpdateAddlInfoQuestion'; }
}

// @Route("/AddlInfoQuestion/{id}", "DELETE")
export class DeleteAddlInfoQuestion
{
    public id: number;

    public constructor(init?: Partial<DeleteAddlInfoQuestion>) { (Object as any).assign(this, init); }
}

// @Route("/AuditMessageComment/{id}", "GET")
export class GetAuditMessageComment implements IReturn<AuditMessageComment>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAuditMessageComment>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageComment(); }
    public getTypeName() { return 'GetAuditMessageComment'; }
}

// @Route("/AuditMessageComment", "POST")
export class StoreAuditMessageComment implements IReturn<AuditMessageComment>
{
    public audit_message_id: number;
    public text: string;
    public created_date: string;
    public created_by: string;
    public notification_status: string;
    public notification_sent_date?: string;
    public is_acknowledged: boolean;
    public acknowledged_date?: string;
    public ncms_id: string;

    public constructor(init?: Partial<StoreAuditMessageComment>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageComment(); }
    public getTypeName() { return 'StoreAuditMessageComment'; }
}

// @Route("/AuditMessageComment", "PUT")
export class UpdateAuditMessageComment implements IReturn<AuditMessageComment>
{
    public id: number;
    public audit_message_id: number;
    public text: string;
    public created_date: string;
    public created_by: string;
    public notification_status: string;
    public notification_sent_date?: string;
    public is_acknowledged: boolean;
    public acknowledged_date?: string;
    public ncms_id: string;

    public constructor(init?: Partial<UpdateAuditMessageComment>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageComment(); }
    public getTypeName() { return 'UpdateAuditMessageComment'; }
}

// @Route("/AuditMessageComment/{id}", "DELETE")
export class DeleteAuditMessageComment
{
    public id: number;

    public constructor(init?: Partial<DeleteAuditMessageComment>) { (Object as any).assign(this, init); }
}

// @Route("/AuditMessage/{id}", "GET")
export class GetAuditMessage implements IReturn<AuditMessage>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAuditMessage>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessage(); }
    public getTypeName() { return 'GetAuditMessage'; }
}

// @Route("/AuditMessage", "POST")
export class StoreAuditMessage implements IReturn<AuditMessage>
{
    public field_name: string;
    public field_id: string;
    public notification_status: string;
    public notification_sent_date?: string;
    public status: string;
    public message_text: string;
    public message_template_id: number;
    public created_date: string;
    public created_by: string;
    public comments: string;
    public module: string;
    public ncms_id: string;
    public contractor_read_date?: string;
    public admin_read_date?: string;

    public constructor(init?: Partial<StoreAuditMessage>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessage(); }
    public getTypeName() { return 'StoreAuditMessage'; }
}

// @Route("/AuditMessage", "PUT")
export class UpdateAuditMessage implements IReturn<AuditMessage>
{
    public id: number;
    public field_name: string;
    public field_id: string;
    public notification_status: string;
    public notification_sent_date?: string;
    public status: string;
    public message_text: string;
    public message_template_id: number;
    public created_date: string;
    public created_by: string;
    public comments: string;
    public module: string;
    public ncms_id: string;
    public contractor_read_date?: string;
    public admin_read_date?: string;

    public constructor(init?: Partial<UpdateAuditMessage>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessage(); }
    public getTypeName() { return 'UpdateAuditMessage'; }
}

// @Route("/AuditMessage/{id}", "DELETE")
export class DeleteAuditMessage
{
    public id: number;

    public constructor(init?: Partial<DeleteAuditMessage>) { (Object as any).assign(this, init); }
}

// @Route("/AuditMessageTemplate/{id}", "GET")
export class GetAuditMessageTemplate implements IReturn<AuditMessage>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAuditMessageTemplate>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessage(); }
    public getTypeName() { return 'GetAuditMessageTemplate'; }
}

// @Route("/AuditMessageTemplate", "POST")
export class StoreAuditMessageTemplate implements IReturn<AuditMessageTemplate>
{
    public ncms_Id: string;
    public name: string;
    public version: number;
    public moduleId: string;
    public fieldId: string;
    public validUntil?: string;
    public statusEnum: AuditMessageTemplateStatusEnum;
    public type: string;

    public constructor(init?: Partial<StoreAuditMessageTemplate>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageTemplate(); }
    public getTypeName() { return 'StoreAuditMessageTemplate'; }
}

// @Route("/AuditMessageTemplate", "PUT")
export class UpdateAuditMessageTemplate implements IReturn<AuditMessageTemplate>
{
    public id: number;
    public ncms_Id: string;
    public name: string;
    public version: number;
    public moduleId: string;
    public fieldId: string;
    public validUntil?: string;
    public statusEnum: AuditMessageTemplateStatusEnum;
    public type: string;

    public constructor(init?: Partial<UpdateAuditMessageTemplate>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageTemplate(); }
    public getTypeName() { return 'UpdateAuditMessageTemplate'; }
}

// @Route("/AuditMessageTemplate/{id}", "DELETE")
export class DeleteAuditMessageTemplate
{
    public id: number;

    public constructor(init?: Partial<DeleteAuditMessageTemplate>) { (Object as any).assign(this, init); }
}

// @Route("/AuditMessageTemplateVersion/{id}", "GET")
export class GetAuditMessageTemplateVersion implements IReturn<AuditMessage>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAuditMessageTemplateVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessage(); }
    public getTypeName() { return 'GetAuditMessageTemplateVersion'; }
}

// @Route("/AuditMessageTemplateVersion", "POST")
export class StoreAuditMessageTemplateVersion implements IReturn<AuditMessageTemplateVersion>
{
    public ncmS_Id: string;
    public auditMessageTemplateId: number;
    public text: string;
    public isActive: boolean;

    public constructor(init?: Partial<StoreAuditMessageTemplateVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageTemplateVersion(); }
    public getTypeName() { return 'StoreAuditMessageTemplateVersion'; }
}

// @Route("/AuditMessageTemplateVersion", "PUT")
export class UpdateAuditMessageTemplateVersion implements IReturn<AuditMessageTemplateVersion>
{
    public id: number;
    public ncmS_Id: string;
    public auditMessageTemplateId: number;
    public text: string;
    public isActive: boolean;

    public constructor(init?: Partial<UpdateAuditMessageTemplateVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuditMessageTemplateVersion(); }
    public getTypeName() { return 'UpdateAuditMessageTemplateVersion'; }
}

// @Route("/AuditMessageTemplateVersion/{id}", "DELETE")
export class DeleteAuditMessageTemplateVersion
{
    public id: number;

    public constructor(init?: Partial<DeleteAuditMessageTemplateVersion>) { (Object as any).assign(this, init); }
}

// @Route("/Audit/{id}", "GET")
export class GetAudit implements IReturn<Audit>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetAudit>) { (Object as any).assign(this, init); }
    public createResponse() { return new Audit(); }
    public getTypeName() { return 'GetAudit'; }
}

// @Route("/Audit", "POST")
export class StoreAudit implements IReturn<Audit>
{
    public ncms_id: string;
    public start_date?: string;
    public end_date?: string;
    public created_date: string;
    public updated_date?: string;

    public constructor(init?: Partial<StoreAudit>) { (Object as any).assign(this, init); }
    public createResponse() { return new Audit(); }
    public getTypeName() { return 'StoreAudit'; }
}

// @Route("/Audit", "PUT")
export class UpdateAudit implements IReturn<Audit>
{
    public id: number;
    public ncms_id: string;
    public start_date?: string;
    public end_date?: string;
    public created_date: string;
    public updated_date?: string;

    public constructor(init?: Partial<UpdateAudit>) { (Object as any).assign(this, init); }
    public createResponse() { return new Audit(); }
    public getTypeName() { return 'UpdateAudit'; }
}

// @Route("/Audit/{id}", "DELETE")
export class DeleteAudit
{
    public id: number;

    public constructor(init?: Partial<DeleteAudit>) { (Object as any).assign(this, init); }
}

// @Route("/Comment/{id}", "GET")
export class GetComment implements IReturn<Comment>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetComment>) { (Object as any).assign(this, init); }
    public createResponse() { return new Comment(); }
    public getTypeName() { return 'GetComment'; }
}

// @Route("/Comment", "POST")
export class StoreComment implements IReturn<Comment>
{
    public type: string;
    public ncms_id: string;
    public module: string;
    public username: string;
    public first_name: string;
    public last_name: string;
    public date_time?: string;
    public body: string;
    public archivedDate?: string;

    public constructor(init?: Partial<StoreComment>) { (Object as any).assign(this, init); }
    public createResponse() { return new Comment(); }
    public getTypeName() { return 'StoreComment'; }
}

// @Route("/Comment", "PUT")
export class UpdateComment implements IReturn<Comment>
{
    public id: number;
    public type: string;
    public ncms_id: string;
    public module: string;
    public username: string;
    public first_name: string;
    public last_name: string;
    public date_time?: string;
    public body: string;
    public archivedDate?: string;

    public constructor(init?: Partial<UpdateComment>) { (Object as any).assign(this, init); }
    public createResponse() { return new Comment(); }
    public getTypeName() { return 'UpdateComment'; }
}

// @Route("/Comment/{id}", "DELETE")
export class DeleteComment
{
    public id: number;

    public constructor(init?: Partial<DeleteComment>) { (Object as any).assign(this, init); }
}

// @Route("/Company/{ncms_id}", "GET")
export class GetCompany implements IReturn<Company>
{
    public ncms_id: string;
    public asOf?: string;

    public constructor(init?: Partial<GetCompany>) { (Object as any).assign(this, init); }
    public createResponse() { return new Company(); }
    public getTypeName() { return 'GetCompany'; }
}

// @Route("/Company", "POST")
export class StoreCompany implements IReturn<Company>
{
    public ncms_id: string;
    public name: string;
    public previous_name: string;
    public dba_name: string;
    public mailing_address: string;
    public mailing_city: string;
    public mailing_state: string;
    public mailing_zip: string;
    public phone: string;
    public federal_id: string;
    public isnid: string;
    public itsid: string;
    public phmsa?: boolean;
    public fmcsa?: boolean;
    public faa?: boolean;
    public uscg?: boolean;
    public fra?: boolean;
    public uses_tpa?: boolean;
    public tpa_name: string;
    public type_of_work: string;
    public employee_awareness_policy_agree?: boolean;

    public constructor(init?: Partial<StoreCompany>) { (Object as any).assign(this, init); }
    public createResponse() { return new Company(); }
    public getTypeName() { return 'StoreCompany'; }
}

// @Route("/Company", "PUT")
export class UpdateCompany implements IReturn<Company>
{
    public ncms_id: string;
    public name: string;
    public previous_name: string;
    public dba_name: string;
    public mailing_address: string;
    public mailing_city: string;
    public mailing_state: string;
    public mailing_zip: string;
    public phone: string;
    public federal_id: string;
    public isnid: string;
    public itsid: string;
    public phmsa?: boolean;
    public fmcsa?: boolean;
    public faa?: boolean;
    public uscg?: boolean;
    public fra?: boolean;
    public uses_tpa?: boolean;
    public tpa_name: string;
    public type_of_work: string;
    public employee_awareness_policy_agree?: boolean;

    public constructor(init?: Partial<UpdateCompany>) { (Object as any).assign(this, init); }
    public createResponse() { return new Company(); }
    public getTypeName() { return 'UpdateCompany'; }
}

// @Route("/Company/{ncms_id}", "DELETE")
export class DeleteCompany
{
    public ncms_id: string;

    public constructor(init?: Partial<DeleteCompany>) { (Object as any).assign(this, init); }
}

// @Route("/Contact/{id}", "GET")
export class GetContact implements IReturn<Contact>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetContact>) { (Object as any).assign(this, init); }
    public createResponse() { return new Contact(); }
    public getTypeName() { return 'GetContact'; }
}

// @Route("/Contact", "POST")
export class StoreContact implements IReturn<Contact>
{
    public ncms_id: string;
    public name: string;
    public email: string;
    public phone: string;
    public fax: string;
    public primary: boolean;

    public constructor(init?: Partial<StoreContact>) { (Object as any).assign(this, init); }
    public createResponse() { return new Contact(); }
    public getTypeName() { return 'StoreContact'; }
}

// @Route("/Contact", "PUT")
export class UpdateContact implements IReturn<Contact>
{
    public id: number;
    public ncms_id: string;
    public name: string;
    public email: string;
    public phone: string;
    public fax: string;
    public primary: boolean;

    public constructor(init?: Partial<UpdateContact>) { (Object as any).assign(this, init); }
    public createResponse() { return new Contact(); }
    public getTypeName() { return 'UpdateContact'; }
}

// @Route("/Contact/{id}", "DELETE")
export class DeleteContact
{
    public id: number;

    public constructor(init?: Partial<DeleteContact>) { (Object as any).assign(this, init); }
}

// @Route("/ContractorModuleDisable/{ncmsid}", "GET")
export class GetContractorModuleDisabled implements IReturn<string[]>
{
    public ncmsid: string;

    public constructor(init?: Partial<GetContractorModuleDisabled>) { (Object as any).assign(this, init); }
    public createResponse() { return new Array<string>(); }
    public getTypeName() { return 'GetContractorModuleDisabled'; }
}

// @Route("/ContractorModuleDisable/{ncmsid}", "POST")
export class StoreContractorModuleDisabled implements IReturn<Contact>
{
    public ncmsid: string;
    public modules: string[];

    public constructor(init?: Partial<StoreContractorModuleDisabled>) { (Object as any).assign(this, init); }
    public createResponse() { return new Contact(); }
    public getTypeName() { return 'StoreContractorModuleDisabled'; }
}

// @Route("/CoveredPosition/{id}", "GET")
export class GetCoveredPosition implements IReturn<CoveredPosition>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetCoveredPosition>) { (Object as any).assign(this, init); }
    public createResponse() { return new CoveredPosition(); }
    public getTypeName() { return 'GetCoveredPosition'; }
}

// @Route("/CoveredPosition", "POST")
export class StoreCoveredPosition implements IReturn<CoveredPosition>
{
    public ncms_id: string;
    public job_title: string;
    public job_type: string;
    public modelPlanId: number;

    public constructor(init?: Partial<StoreCoveredPosition>) { (Object as any).assign(this, init); }
    public createResponse() { return new CoveredPosition(); }
    public getTypeName() { return 'StoreCoveredPosition'; }
}

// @Route("/CoveredPosition", "PUT")
export class UpdateCoveredPosition implements IReturn<CoveredPosition>
{
    public id: number;
    public ncms_id: string;
    public job_title: string;
    public job_type: string;
    public modelPlanId: number;

    public constructor(init?: Partial<UpdateCoveredPosition>) { (Object as any).assign(this, init); }
    public createResponse() { return new CoveredPosition(); }
    public getTypeName() { return 'UpdateCoveredPosition'; }
}

// @Route("/CoveredPosition/{id}", "DELETE")
export class DeleteCoveredPosition
{
    public id: number;

    public constructor(init?: Partial<DeleteCoveredPosition>) { (Object as any).assign(this, init); }
}

// @Route("/CR_GREF_Employee/{id}", "GET")
export class GetCR_GREF_Employee implements IReturn<CR_GREF_Employee>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetCR_GREF_Employee>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_GREF_Employee(); }
    public getTypeName() { return 'GetCR_GREF_Employee'; }
}

// @Route("/CR_GREF_Employee", "POST")
export class StoreCR_GREF_Employee implements IReturn<CR_GREF_Employee>
{
    public ncms_id: string;
    public type: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public most_recent_drug?: string;
    public most_recent_alcohol?: string;
    public test_type: string;
    public pool_name: string;
    public background_check_date?: string;
    public background_check_company?: string;
    public location: string;

    public constructor(init?: Partial<StoreCR_GREF_Employee>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_GREF_Employee(); }
    public getTypeName() { return 'StoreCR_GREF_Employee'; }
}

// @Route("/CR_GREF_Employee", "PUT")
export class UpdateCR_GREF_Employee implements IReturn<CR_GREF_Employee>
{
    public id: number;
    public ncms_id: string;
    public type: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public most_recent_drug?: string;
    public most_recent_alcohol?: string;
    public test_type: string;
    public pool_name: string;
    public background_check_date?: string;
    public background_check_company?: string;
    public location: string;

    public constructor(init?: Partial<UpdateCR_GREF_Employee>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_GREF_Employee(); }
    public getTypeName() { return 'UpdateCR_GREF_Employee'; }
}

// @Route("/CR_GREF_Employee/{id}", "DELETE")
export class DeleteCR_GREF_Employee
{
    public id: number;

    public constructor(init?: Partial<DeleteCR_GREF_Employee>) { (Object as any).assign(this, init); }
}

// @Route("/CR_JobFunction/{id}", "GET")
export class GetCR_JobFunction implements IReturn<CR_JobFunction>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetCR_JobFunction>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_JobFunction(); }
    public getTypeName() { return 'GetCR_JobFunction'; }
}

// @Route("/CR_JobFunction", "POST")
export class StoreCR_JobFunction implements IReturn<CR_JobFunction>
{
    public ncms_id: string;
    public selected: boolean;
    public auditVersion: number;
    public jobFunction: string;
    public operatorCode: string;
    public jobDescription: string;

    public constructor(init?: Partial<StoreCR_JobFunction>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_JobFunction(); }
    public getTypeName() { return 'StoreCR_JobFunction'; }
}

// @Route("/CR_JobFunction", "PUT")
export class UpdateCR_JobFunction implements IReturn<CR_JobFunction>
{
    public id: number;
    public ncms_id: string;
    public selected: boolean;
    public auditVersion: number;
    public jobFunction: string;
    public operatorCode: string;
    public jobDescription: string;

    public constructor(init?: Partial<UpdateCR_JobFunction>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_JobFunction(); }
    public getTypeName() { return 'UpdateCR_JobFunction'; }
}

// @Route("/CR_JobFunction/{id}", "DELETE")
export class DeleteCR_JobFunction
{
    public id: number;

    public constructor(init?: Partial<DeleteCR_JobFunction>) { (Object as any).assign(this, init); }
}

// @Route("/CR_Policy/{id}", "GET")
export class GetCR_Policy implements IReturn<CR_Policy>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetCR_Policy>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_Policy(); }
    public getTypeName() { return 'GetCR_Policy'; }
}

// @Route("/CR_Policy", "POST")
export class StoreCR_Policy implements IReturn<CR_Policy>
{
    public ncms_id: string;
    public policy_action: string;
    public policy_company_name: string;
    public policy_addendum_id: string;
    public policy_effective_date?: string;
    public policy_upload_meets_requirements?: boolean;
    public file_path: string;
    public file_name: string;
    public file_guid: string;
    public file_salt: string;
    public uploaded_date?: string;

    public constructor(init?: Partial<StoreCR_Policy>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_Policy(); }
    public getTypeName() { return 'StoreCR_Policy'; }
}

// @Route("/CR_Policy", "PUT")
export class UpdateCR_Policy implements IReturn<CR_Policy>
{
    public id: number;
    public ncms_id: string;
    public policy_action: string;
    public policy_company_name: string;
    public policy_addendum_id: string;
    public policy_effective_date?: string;
    public policy_upload_meets_requirements?: boolean;
    public file_path: string;
    public file_name: string;
    public file_guid: string;
    public file_salt: string;
    public uploaded_date?: string;

    public constructor(init?: Partial<UpdateCR_Policy>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_Policy(); }
    public getTypeName() { return 'UpdateCR_Policy'; }
}

// @Route("/CR_Policy/{id}", "DELETE")
export class DeleteCR_Policy
{
    public id: number;

    public constructor(init?: Partial<DeleteCR_Policy>) { (Object as any).assign(this, init); }
}

// @Route("/CR_TB_Policy/{id}", "GET")
export class GetCR_TB_Policy implements IReturn<CR_TB_Policy>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetCR_TB_Policy>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_TB_Policy(); }
    public getTypeName() { return 'GetCR_TB_Policy'; }
}

// @Route("/CR_TB_Policy", "POST")
export class StoreCR_TB_Policy implements IReturn<CR_TB_Policy>
{
    public ncms_id: string;
    public policy_action: string;
    public policy_company_name: string;
    public policy_addendum_id: string;
    public policy_effective_date: string;
    public policy_upload_meets_requirements?: boolean;
    public policy_file_guid: string;
    public uploaded_date?: string;

    public constructor(init?: Partial<StoreCR_TB_Policy>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_TB_Policy(); }
    public getTypeName() { return 'StoreCR_TB_Policy'; }
}

// @Route("/CR_TB_Policy", "PUT")
export class UpdateCR_TB_Policy implements IReturn<CR_TB_Policy>
{
    public id: number;
    public ncms_id: string;
    public policy_action: string;
    public policy_company_name: string;
    public policy_addendum_id: string;
    public policy_effective_date: string;
    public policy_upload_meets_requirements?: boolean;
    public policy_file_guid: string;
    public uploaded_date?: string;

    public constructor(init?: Partial<UpdateCR_TB_Policy>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_TB_Policy(); }
    public getTypeName() { return 'UpdateCR_TB_Policy'; }
}

// @Route("/CR_TB_Policy/{id}", "DELETE")
export class DeleteCR_TB_Policy
{
    public id: number;

    public constructor(init?: Partial<DeleteCR_TB_Policy>) { (Object as any).assign(this, init); }
}

// @Route("/CR_TestingProtocolLab/{id}", "GET")
export class GetCR_TestingProtocolLab implements IReturn<CR_TestingProtocolLab>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetCR_TestingProtocolLab>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_TestingProtocolLab(); }
    public getTypeName() { return 'GetCR_TestingProtocolLab'; }
}

// @Route("/CR_TestingProtocolLab", "POST")
export class StoreCR_TestingProtocolLab implements IReturn<CR_TestingProtocolLab>
{
    public ncms_id: string;
    public lab_name: string;
    public lab_address: string;
    public lab_city: string;
    public lab_state: string;
    public lab_zip: string;
    public lab_phone: string;
    public samhsa_certified?: boolean;
    public mro_name: string;
    public mro_phone: string;

    public constructor(init?: Partial<StoreCR_TestingProtocolLab>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_TestingProtocolLab(); }
    public getTypeName() { return 'StoreCR_TestingProtocolLab'; }
}

// @Route("/CR_TestingProtocolLab", "PUT")
export class UpdateCR_TestingProtocolLab implements IReturn<CR_TestingProtocolLab>
{
    public id: number;
    public ncms_id: string;
    public lab_name: string;
    public lab_address: string;
    public lab_city: string;
    public lab_state: string;
    public lab_zip: string;
    public lab_phone: string;
    public samhsa_certified?: boolean;
    public mro_name: string;
    public mro_phone: string;

    public constructor(init?: Partial<UpdateCR_TestingProtocolLab>) { (Object as any).assign(this, init); }
    public createResponse() { return new CR_TestingProtocolLab(); }
    public getTypeName() { return 'UpdateCR_TestingProtocolLab'; }
}

// @Route("/CR_TestingProtocolLab/{id}", "DELETE")
export class DeleteCR_TestingProtocolLab
{
    public id: number;

    public constructor(init?: Partial<DeleteCR_TestingProtocolLab>) { (Object as any).assign(this, init); }
}

// @Route("/Email", "POST")
// @Route("/Email", "PUT")
export class StoreEmail implements IReturn<Contact>
{
    public to: string;
    public ncms_id: string;
    public from: string;
    public subject: string;
    public html_body: string;
    public send_after?: string;
    public sent?: string;
    public cc: string;
    public bcc: string;

    public constructor(init?: Partial<StoreEmail>) { (Object as any).assign(this, init); }
    public createResponse() { return new Contact(); }
    public getTypeName() { return 'StoreEmail'; }
}

// @Route("/Employee/{id}", "GET")
export class GetEmployee implements IReturn<Employee>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetEmployee>) { (Object as any).assign(this, init); }
    public createResponse() { return new Employee(); }
    public getTypeName() { return 'GetEmployee'; }
}

// @Route("/EmployeeGraph", "GET")
export class GetEmployeeList implements IReturn<Employee[]>
{
    public skip?: number;
    public take?: number;
    public orderBy: string;
    public orderByDesc: string;
    public include: string;
    public status?: EmployeeValidationStatusEnum;

    public constructor(init?: Partial<GetEmployeeList>) { (Object as any).assign(this, init); }
    public createResponse() { return new Array<Employee>(); }
    public getTypeName() { return 'GetEmployeeList'; }
}

// @Route("/Employee", "POST")
export class StoreEmployee implements IReturn<Employee>
{
    public ncms_id: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public most_recent_test?: string;
    public test_type: string;
    public pool_name: string;

    public constructor(init?: Partial<StoreEmployee>) { (Object as any).assign(this, init); }
    public createResponse() { return new Employee(); }
    public getTypeName() { return 'StoreEmployee'; }
}

// @Route("/Employee", "PUT")
export class UpdateEmployee implements IReturn<Employee>
{
    public id: number;
    public ncms_id: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public most_recent_test?: string;
    public test_type: string;
    public pool_name: string;

    public constructor(init?: Partial<UpdateEmployee>) { (Object as any).assign(this, init); }
    public createResponse() { return new Employee(); }
    public getTypeName() { return 'UpdateEmployee'; }
}

// @Route("/Employee", "PATCH")
export class PatchEmployee implements IReturn<Employee>
{
    public id: number;
    public first_name: string;
    public last_name: string;
    public status: EmployeeValidationStatusEnum;

    public constructor(init?: Partial<PatchEmployee>) { (Object as any).assign(this, init); }
    public createResponse() { return new Employee(); }
    public getTypeName() { return 'PatchEmployee'; }
}

// @Route("/Employee/{id}", "DELETE")
export class DeleteEmployee
{
    public id: number;

    public constructor(init?: Partial<DeleteEmployee>) { (Object as any).assign(this, init); }
}

// @Route("/EmployeeValidationFile/{id}", "GET")
// @Route("/EmployeeValidation/{evid}/File/{id}", "GET")
export class GetEmployeeValidationFile implements IReturn<EmployeeValidationFile>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetEmployeeValidationFile>) { (Object as any).assign(this, init); }
    public createResponse() { return new EmployeeValidationFile(); }
    public getTypeName() { return 'GetEmployeeValidationFile'; }
}

// @Route("/EmployeeValidationFile", "POST")
export class StoreEmployeeValidationFile implements IReturn<EmployeeValidationFile>
{
    public ncms_id: string;
    public employee_validation_id: number;
    public file_type: EmployeeValidationFileType;
    public upload_date: string;
    public upload_user_id: string;
    public file_location: string;
    public status: EmployeeValidationFileStatus;
    public file_id: number;

    public constructor(init?: Partial<StoreEmployeeValidationFile>) { (Object as any).assign(this, init); }
    public createResponse() { return new EmployeeValidationFile(); }
    public getTypeName() { return 'StoreEmployeeValidationFile'; }
}

// @Route("/EmployeeValidationFile", "PUT")
export class UpdateEmployeeValidationFile implements IReturn<EmployeeValidationFile>
{
    public id: number;
    public ncms_id: string;
    public employee_validation_id: number;
    public file_type: EmployeeValidationFileType;
    public upload_date: string;
    public upload_user_id: string;
    public file_location: string;
    public status: EmployeeValidationFileStatus;
    public file_id: number;

    public constructor(init?: Partial<UpdateEmployeeValidationFile>) { (Object as any).assign(this, init); }
    public createResponse() { return new EmployeeValidationFile(); }
    public getTypeName() { return 'UpdateEmployeeValidationFile'; }
}

// @Route("/EmployeeValidationFile/{id}", "DELETE")
export class DeleteEmployeeValidationFile
{
    public id: number;

    public constructor(init?: Partial<DeleteEmployeeValidationFile>) { (Object as any).assign(this, init); }
}

// @Route("/EmployeeValidation/{id}", "GET")
export class GetEmployeeValidation implements IReturn<EmployeeValidation>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetEmployeeValidation>) { (Object as any).assign(this, init); }
    public createResponse() { return new EmployeeValidation(); }
    public getTypeName() { return 'GetEmployeeValidation'; }
}

// @Route("/EmployeeValidation/{id}/files", "GET")
export class GetEmployeeValidationFiles implements IReturn<EmployeeValidationFile[]>
{
    public id: number;

    public constructor(init?: Partial<GetEmployeeValidationFiles>) { (Object as any).assign(this, init); }
    public createResponse() { return new Array<EmployeeValidationFile>(); }
    public getTypeName() { return 'GetEmployeeValidationFiles'; }
}

// @Route("/EmployeeValidation", "PATCH")
export class PatchEmployeeValidation implements IReturn<EmployeeValidation>
{
    public id: number;
    public statusEnum: EmployeeValidationStatusEnum;

    public constructor(init?: Partial<PatchEmployeeValidation>) { (Object as any).assign(this, init); }
    public createResponse() { return new EmployeeValidation(); }
    public getTypeName() { return 'PatchEmployeeValidation'; }
}

// @Route("/EmployeeValidation", "POST")
export class StoreEmployeeValidation implements IReturnVoid
{
    public ncms_id: string;
    public requested_date: string;
    public requestor_user_id: string;
    public validation_type: string;
    public completed_date?: string;
    public employeeId: number;
    public status: EmployeeValidationStatusEnum;
    public employeeIds: number[];

    public constructor(init?: Partial<StoreEmployeeValidation>) { (Object as any).assign(this, init); }
    public createResponse() {}
    public getTypeName() { return 'StoreEmployeeValidation'; }
}

// @Route("/EmployeeValidation", "PUT")
export class UpdateEmployeeValidation implements IReturn<EmployeeValidation>
{
    public id: number;
    public ncms_id: string;
    public requested_date: string;
    public requestor_user_id: string;
    public validation_type: string;
    public completed_date?: string;
    public status: EmployeeValidationStatusEnum;

    public constructor(init?: Partial<UpdateEmployeeValidation>) { (Object as any).assign(this, init); }
    public createResponse() { return new EmployeeValidation(); }
    public getTypeName() { return 'UpdateEmployeeValidation'; }
}

// @Route("/EmployeeValidation/{id}", "DELETE")
export class DeleteEmployeeValidation
{
    public id: number;

    public constructor(init?: Partial<DeleteEmployeeValidation>) { (Object as any).assign(this, init); }
}

// @Route("/File/{id}", "GET")
export class GetFile implements IReturn<File>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetFile>) { (Object as any).assign(this, init); }
    public createResponse() { return new File(); }
    public getTypeName() { return 'GetFile'; }
}

// @Route("/File", "POST")
export class StoreFile implements IReturn<File>
{
    public ncms_id: string;
    public type: string;
    public name: string;
    public upload_date?: string;
    public salt: string;
    public data: string;

    public constructor(init?: Partial<StoreFile>) { (Object as any).assign(this, init); }
    public createResponse() { return new File(); }
    public getTypeName() { return 'StoreFile'; }
}

// @Route("/File/{id}", "DELETE")
export class DeleteFile
{
    public id: number;

    public constructor(init?: Partial<DeleteFile>) { (Object as any).assign(this, init); }
}

// @Route("/HelpContent/{id}", "GET")
export class GetHelpContent implements IReturn<HelpContent>
{
    public id: number;
    public module_id: string;
    public asOf?: string;

    public constructor(init?: Partial<GetHelpContent>) { (Object as any).assign(this, init); }
    public createResponse() { return new HelpContent(); }
    public getTypeName() { return 'GetHelpContent'; }
}

// @Route("/HelpContent/{module_id}")
export class GetHelpContentByModule implements IReturn<HelpContent>
{
    public module_id: string;
    public includeNonActive: boolean;

    public constructor(init?: Partial<GetHelpContentByModule>) { (Object as any).assign(this, init); }
    public createResponse() { return new HelpContent(); }
    public getTypeName() { return 'GetHelpContentByModule'; }
}

// @Route("/HelpContentVersion/{id}", "GET")
export class GetHelpContentVersion implements IReturn<HelpContentVersion>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetHelpContentVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new HelpContentVersion(); }
    public getTypeName() { return 'GetHelpContentVersion'; }
}

// @Route("/helpcontent/{module_id}/version", "POST")
export class StoreHelpContentVersion implements IReturn<HelpContentVersion>
{
    public module_id: string;
    public helpcontentid: number;
    public content: string;

    public constructor(init?: Partial<StoreHelpContentVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new HelpContentVersion(); }
    public getTypeName() { return 'StoreHelpContentVersion'; }
}

// @Route("/helpcontent/{module_id}/version/{versionnumber}/active", "PUT")
export class UpdateHelpContentVersion implements IReturn<HelpContentVersion>
{
    public module_id: string;
    public versionnumber: number;

    public constructor(init?: Partial<UpdateHelpContentVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new HelpContentVersion(); }
    public getTypeName() { return 'UpdateHelpContentVersion'; }
}

// @Route("/HistoryCheckForm/{id}", "GET")
export class GetHistoryCheckForm implements IReturn<HistoryCheckForm>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetHistoryCheckForm>) { (Object as any).assign(this, init); }
    public createResponse() { return new HistoryCheckForm(); }
    public getTypeName() { return 'GetHistoryCheckForm'; }
}

// @Route("/HistoryCheckForm", "POST")
export class StoreHistoryCheckForm implements IReturn<HistoryCheckForm>
{
    public ncms_id: string;
    public fileid: number;

    public constructor(init?: Partial<StoreHistoryCheckForm>) { (Object as any).assign(this, init); }
    public createResponse() { return new HistoryCheckForm(); }
    public getTypeName() { return 'StoreHistoryCheckForm'; }
}

// @Route("/HistoryCheckForm", "PUT")
export class UpdateHistoryCheckForm implements IReturn<HistoryCheckForm>
{
    public id: number;
    public ncms_id: string;
    public fileid: number;

    public constructor(init?: Partial<UpdateHistoryCheckForm>) { (Object as any).assign(this, init); }
    public createResponse() { return new HistoryCheckForm(); }
    public getTypeName() { return 'UpdateHistoryCheckForm'; }
}

// @Route("/HistoryCheckForm/{id}", "DELETE")
export class DeleteHistoryCheckForm
{
    public id: number;

    public constructor(init?: Partial<DeleteHistoryCheckForm>) { (Object as any).assign(this, init); }
}

// @Route("/MedicalReviewOfficer/{id}", "GET")
export class GetMedicalReviewOfficer implements IReturn<MedicalReviewOfficer>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetMedicalReviewOfficer>) { (Object as any).assign(this, init); }
    public createResponse() { return new MedicalReviewOfficer(); }
    public getTypeName() { return 'GetMedicalReviewOfficer'; }
}

// @Route("/MedicalReviewOfficer", "POST")
export class StoreMedicalReviewOfficer implements IReturn<MedicalReviewOfficer>
{
    public ncms_id: string;
    public laboratory_address: string;
    public ccf_reviewed_and_signed: string;
    public review_signature_process: string;
    public ccfs_used_for_reporting: string;
    public signed_ccfs_available: string;
    public mro_address: string;
    public mro_colocated: string;
    public physical_separation: string;
    public mro_assistants: string;
    public quality_assurance: string;
    public frequency_of_reviews: string;
    public oversight_assistants: string;
    public hiring: string;
    public substituted?: boolean;
    public refusal?: boolean;
    public adulterated?: boolean;
    public negative?: boolean;
    public confirmed_positive?: boolean;
    public ccf_reviewed_and_signed_explanation: string;
    public mro_qa_explanation: string;
    public mro_hiring_explanation: string;
    public mro_oversight_explanation: string;

    public constructor(init?: Partial<StoreMedicalReviewOfficer>) { (Object as any).assign(this, init); }
    public createResponse() { return new MedicalReviewOfficer(); }
    public getTypeName() { return 'StoreMedicalReviewOfficer'; }
}

// @Route("/MedicalReviewOfficer", "PUT")
export class UpdateMedicalReviewOfficer implements IReturn<MedicalReviewOfficer>
{
    public id: number;
    public ncms_id: string;
    public laboratory_address: string;
    public ccf_reviewed_and_signed: string;
    public review_signature_process: string;
    public ccfs_used_for_reporting: string;
    public signed_ccfs_available: string;
    public mro_address: string;
    public mro_colocated: string;
    public physical_separation: string;
    public mro_assistants: string;
    public quality_assurance: string;
    public frequency_of_reviews: string;
    public oversight_assistants: string;
    public hiring: string;
    public substituted?: boolean;
    public refusal?: boolean;
    public adulterated?: boolean;
    public negative?: boolean;
    public confirmed_positive?: boolean;
    public ccf_reviewed_and_signed_explanation: string;
    public mro_qa_explanation: string;
    public mro_hiring_explanation: string;
    public mro_oversight_explanation: string;

    public constructor(init?: Partial<UpdateMedicalReviewOfficer>) { (Object as any).assign(this, init); }
    public createResponse() { return new MedicalReviewOfficer(); }
    public getTypeName() { return 'UpdateMedicalReviewOfficer'; }
}

// @Route("/MedicalReviewOfficer/{id}", "DELETE")
export class DeleteMedicalReviewOfficer
{
    public id: number;

    public constructor(init?: Partial<DeleteMedicalReviewOfficer>) { (Object as any).assign(this, init); }
}

// @Route("/MessageTemplate/{id}", "GET")
export class GetMessageTemplate implements IReturn<MessageTemplate>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetMessageTemplate>) { (Object as any).assign(this, init); }
    public createResponse() { return new MessageTemplate(); }
    public getTypeName() { return 'GetMessageTemplate'; }
}

// @Route("/MessageTemplate", "POST")
export class StoreMessageTemplate implements IReturn<MessageTemplate>
{
    public ncms_id: string;
    public module_name: string;
    public field_name: string;

    public constructor(init?: Partial<StoreMessageTemplate>) { (Object as any).assign(this, init); }
    public createResponse() { return new MessageTemplate(); }
    public getTypeName() { return 'StoreMessageTemplate'; }
}

// @Route("/MessageTemplate", "PUT")
export class UpdateMessageTemplate implements IReturn<MessageTemplate>
{
    public id: number;
    public ncms_id: string;
    public module_name: string;
    public field_name: string;

    public constructor(init?: Partial<UpdateMessageTemplate>) { (Object as any).assign(this, init); }
    public createResponse() { return new MessageTemplate(); }
    public getTypeName() { return 'UpdateMessageTemplate'; }
}

// @Route("/MessageTemplate/{id}", "DELETE")
export class DeleteMessageTemplate
{
    public id: number;

    public constructor(init?: Partial<DeleteMessageTemplate>) { (Object as any).assign(this, init); }
}

// @Route("/MessageTemplateVersion/{id}", "GET")
export class GetMessageTemplateVersion implements IReturn<MessageTemplateVersion>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetMessageTemplateVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new MessageTemplateVersion(); }
    public getTypeName() { return 'GetMessageTemplateVersion'; }
}

// @Route("/MessageTemplateVersion", "POST")
export class StoreMessageTemplateVersion implements IReturn<MessageTemplateVersion>
{
    public ncms_id: string;
    public description: string;
    public message_content: string;
    public message_template_id: number;

    public constructor(init?: Partial<StoreMessageTemplateVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new MessageTemplateVersion(); }
    public getTypeName() { return 'StoreMessageTemplateVersion'; }
}

// @Route("/MessageTemplateVersion", "PUT")
export class UpdateMessageTemplateVersion implements IReturn<MessageTemplateVersion>
{
    public id: number;
    public ncms_id: string;
    public description: string;
    public message_content: string;
    public message_template_id: number;

    public constructor(init?: Partial<UpdateMessageTemplateVersion>) { (Object as any).assign(this, init); }
    public createResponse() { return new MessageTemplateVersion(); }
    public getTypeName() { return 'UpdateMessageTemplateVersion'; }
}

// @Route("/MessageTemplateVersion/{id}", "DELETE")
export class DeleteMessageTemplateVersion
{
    public id: number;

    public constructor(init?: Partial<DeleteMessageTemplateVersion>) { (Object as any).assign(this, init); }
}

// @Route("/ModelPlan/{id}", "GET")
export class GetModelPlan implements IReturn<ModelPlan>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetModelPlan>) { (Object as any).assign(this, init); }
    public createResponse() { return new ModelPlan(); }
    public getTypeName() { return 'GetModelPlan'; }
}

// @Route("/ModelPlan", "POST")
export class StoreModelPlan implements IReturn<ModelPlan>
{
    public ncms_id: string;
    public acknowledged_terms: string;
    public policy_company_name: string;
    public policy_company_address: string;
    public policy_company_phone: string;
    public policy_implementation_date: string;
    public policy_new_effective_date: string;
    public policy_tpa_name: string;
    public policy_tpa_address: string;
    public policy_tpa_phone: string;
    public policy_der_name: string;
    public policy_der_address: string;
    public policy_der_phone: string;
    public policy_samhsa_name: string;
    public policy_samhsa_address: string;
    public policy_samhsa_phone: string;
    public policy_sap_name: string;
    public policy_sap_address: string;
    public policy_sap_phone: string;
    public policy_eap_name: string;
    public policy_eap_address: string;
    public policy_eap_phone: string;
    public policy_mro_name: string;
    public policy_mro_address: string;
    public policy_mro_phone: string;

    public constructor(init?: Partial<StoreModelPlan>) { (Object as any).assign(this, init); }
    public createResponse() { return new ModelPlan(); }
    public getTypeName() { return 'StoreModelPlan'; }
}

// @Route("/ModelPlan", "PUT")
export class UpdateModelPlan implements IReturn<ModelPlan>
{
    public id: number;
    public ncms_id: string;
    public acknowledged_terms: string;
    public policy_company_name: string;
    public policy_company_address: string;
    public policy_company_phone: string;
    public policy_implementation_date: string;
    public policy_new_effective_date: string;
    public policy_tpa_name: string;
    public policy_tpa_address: string;
    public policy_tpa_phone: string;
    public policy_der_name: string;
    public policy_der_address: string;
    public policy_der_phone: string;
    public policy_samhsa_name: string;
    public policy_samhsa_address: string;
    public policy_samhsa_phone: string;
    public policy_sap_name: string;
    public policy_sap_address: string;
    public policy_sap_phone: string;
    public policy_eap_name: string;
    public policy_eap_address: string;
    public policy_eap_phone: string;
    public policy_mro_name: string;
    public policy_mro_address: string;
    public policy_mro_phone: string;

    public constructor(init?: Partial<UpdateModelPlan>) { (Object as any).assign(this, init); }
    public createResponse() { return new ModelPlan(); }
    public getTypeName() { return 'UpdateModelPlan'; }
}

// @Route("/ModelPlan/{id}", "DELETE")
export class DeleteModelPlan
{
    public id: number;

    public constructor(init?: Partial<DeleteModelPlan>) { (Object as any).assign(this, init); }
}

// @Route("/ModelPlanTermAgreement/{id}", "GET")
export class GetModelPlanTermAgreement implements IReturn<ModelPlanTermAgreement>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetModelPlanTermAgreement>) { (Object as any).assign(this, init); }
    public createResponse() { return new ModelPlanTermAgreement(); }
    public getTypeName() { return 'GetModelPlanTermAgreement'; }
}

// @Route("/ModelPlanTermAgreement", "POST")
export class StoreModelPlanTermAgreement implements IReturn<ModelPlanTermAgreement>
{
    public ncms_id: string;
    public terms_agreed: string;
    public terms_guid: string;

    public constructor(init?: Partial<StoreModelPlanTermAgreement>) { (Object as any).assign(this, init); }
    public createResponse() { return new ModelPlanTermAgreement(); }
    public getTypeName() { return 'StoreModelPlanTermAgreement'; }
}

// @Route("/ModelPlanTermAgreement", "PUT")
export class UpdateModelPlanTermAgreement implements IReturn<ModelPlanTermAgreement>
{
    public id: number;
    public ncms_id: string;
    public terms_agreed: string;
    public terms_guid: string;

    public constructor(init?: Partial<UpdateModelPlanTermAgreement>) { (Object as any).assign(this, init); }
    public createResponse() { return new ModelPlanTermAgreement(); }
    public getTypeName() { return 'UpdateModelPlanTermAgreement'; }
}

// @Route("/ModelPlanTermAgreement/{id}", "DELETE")
export class DeleteModelPlanTermAgreement
{
    public id: number;

    public constructor(init?: Partial<DeleteModelPlanTermAgreement>) { (Object as any).assign(this, init); }
}

// @Route("/NotificationEventRecord/{id}", "GET")
export class GetNotificationEventRecord implements IReturn<NotificationEventRecord>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetNotificationEventRecord>) { (Object as any).assign(this, init); }
    public createResponse() { return new NotificationEventRecord(); }
    public getTypeName() { return 'GetNotificationEventRecord'; }
}

// @Route("/NotificationEventRecord", "POST")
export class StoreNotificationEventRecord implements IReturn<NotificationEventRecord>
{
    public ncms_id: string;
    public audit_message_id: number;
    public module: string;
    public field: string;
    public notification_event_id: number;

    public constructor(init?: Partial<StoreNotificationEventRecord>) { (Object as any).assign(this, init); }
    public createResponse() { return new NotificationEventRecord(); }
    public getTypeName() { return 'StoreNotificationEventRecord'; }
}

// @Route("/NotificationEventRecord", "PUT")
export class UpdateNotificationEventRecord implements IReturn<NotificationEventRecord>
{
    public id: number;
    public ncms_id: string;
    public audit_message_id: number;
    public module: string;
    public field: string;
    public notification_event_id: number;

    public constructor(init?: Partial<UpdateNotificationEventRecord>) { (Object as any).assign(this, init); }
    public createResponse() { return new NotificationEventRecord(); }
    public getTypeName() { return 'UpdateNotificationEventRecord'; }
}

// @Route("/NotificationEventRecord/{id}", "DELETE")
export class DeleteNotificationEventRecord
{
    public id: number;

    public constructor(init?: Partial<DeleteNotificationEventRecord>) { (Object as any).assign(this, init); }
}

// @Route("/NotificationEvent/{id}", "GET")
export class GetNotificationEvent implements IReturn<NotificationEvent>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetNotificationEvent>) { (Object as any).assign(this, init); }
    public createResponse() { return new NotificationEvent(); }
    public getTypeName() { return 'GetNotificationEvent'; }
}

// @Route("/NotificationEvent", "POST")
export class StoreNotificationEvent implements IReturn<NotificationEvent>
{
    public ncms_id: string;
    public create_date?: string;

    public constructor(init?: Partial<StoreNotificationEvent>) { (Object as any).assign(this, init); }
    public createResponse() { return new NotificationEvent(); }
    public getTypeName() { return 'StoreNotificationEvent'; }
}

// @Route("/NotificationEvent", "PUT")
export class UpdateNotificationEvent implements IReturn<NotificationEvent>
{
    public id: number;
    public ncms_id: string;
    public create_date?: string;

    public constructor(init?: Partial<UpdateNotificationEvent>) { (Object as any).assign(this, init); }
    public createResponse() { return new NotificationEvent(); }
    public getTypeName() { return 'UpdateNotificationEvent'; }
}

// @Route("/NotificationEvent/{id}", "DELETE")
export class DeleteNotificationEvent
{
    public id: number;

    public constructor(init?: Partial<DeleteNotificationEvent>) { (Object as any).assign(this, init); }
}

// @Route("/Notification/{id}", "GET")
export class GetNotification implements IReturn<Notification>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetNotification>) { (Object as any).assign(this, init); }
    public createResponse() { return new Notification(); }
    public getTypeName() { return 'GetNotification'; }
}

// @Route("/Notification", "POST")
export class StoreNotification implements IReturn<Notification>
{
    public ncms_id: string;
    public receiver: NotificationReceiver;
    public receiveridlist: string;
    public type: NotificationType;
    public sender_type: NotificationSenderType;
    public sender_id: string;
    public body: string;
    public send_time: string;

    public constructor(init?: Partial<StoreNotification>) { (Object as any).assign(this, init); }
    public createResponse() { return new Notification(); }
    public getTypeName() { return 'StoreNotification'; }
}

// @Route("/Notification", "PUT")
export class UpdateNotification implements IReturn<Notification>
{
    public id: number;
    public ncms_id: string;
    public receiver: NotificationReceiver;
    public receiveridlist: string;
    public type: NotificationType;
    public sender_type: NotificationSenderType;
    public sender_id: string;
    public body: string;
    public send_time: string;

    public constructor(init?: Partial<UpdateNotification>) { (Object as any).assign(this, init); }
    public createResponse() { return new Notification(); }
    public getTypeName() { return 'UpdateNotification'; }
}

// @Route("/Notification/{id}", "DELETE")
export class DeleteNotification
{
    public id: number;

    public constructor(init?: Partial<DeleteNotification>) { (Object as any).assign(this, init); }
}

// @Route("/Policy/{id}", "GET")
export class GetPolicy implements IReturn<Policy>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetPolicy>) { (Object as any).assign(this, init); }
    public createResponse() { return new Policy(); }
    public getTypeName() { return 'GetPolicy'; }
}

// @Route("/Policy", "POST")
export class StorePolicy implements IReturn<Policy>
{
    public ncms_id: string;
    public action: string;
    public company_name: string;
    public company_address: string;
    public company_phone: string;

    public constructor(init?: Partial<StorePolicy>) { (Object as any).assign(this, init); }
    public createResponse() { return new Policy(); }
    public getTypeName() { return 'StorePolicy'; }
}

// @Route("/Policy", "PUT")
export class UpdatePolicy implements IReturn<Policy>
{
    public id: number;
    public ncms_id: string;
    public action: string;
    public company_name: string;
    public company_address: string;
    public company_phone: string;

    public constructor(init?: Partial<UpdatePolicy>) { (Object as any).assign(this, init); }
    public createResponse() { return new Policy(); }
    public getTypeName() { return 'UpdatePolicy'; }
}

// @Route("/Policy/{id}", "DELETE")
export class DeletePolicy
{
    public id: number;

    public constructor(init?: Partial<DeletePolicy>) { (Object as any).assign(this, init); }
}

// @Route("/RandomProcess/{id}", "GET")
export class GetRandomProcess implements IReturn<RandomProcess>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetRandomProcess>) { (Object as any).assign(this, init); }
    public createResponse() { return new RandomProcess(); }
    public getTypeName() { return 'GetRandomProcess'; }
}

// @Route("/RandomProcess", "POST")
export class StoreRandomProcess implements IReturn<RandomProcess>
{
    public id: number;
    public ncms_id: string;
    public phmsa?: boolean;
    public fmcsa?: boolean;
    public fra?: boolean;
    public faa?: boolean;
    public uscg?: boolean;
    public tpa_phmsa?: boolean;
    public tpa_fmcsa?: boolean;
    public tpa_fra?: boolean;
    public tpa_faa?: boolean;
    public tpa_uscg?: boolean;
    public fra_drug_precent?: number;
    public fra_alcohol_percent?: number;
    public phmsa_drug_precent?: number;
    public fmcsa_drug_percent?: number;
    public fmcsa_alcohol_percent?: number;
    public faa_drug_percent?: number;
    public faa_alcohol_percent?: number;
    public uscg_drug_percent?: number;
    public selection_frequency: string;
    public consortium_pool: string;
    public alternate_draws: string;
    public alternate_draws_explanation: string;
    public random_draw_documentation: string;
    public random_draws_explanation: string;
    public generator: string;
    public generator_explanation: string;

    public constructor(init?: Partial<StoreRandomProcess>) { (Object as any).assign(this, init); }
    public createResponse() { return new RandomProcess(); }
    public getTypeName() { return 'StoreRandomProcess'; }
}

// @Route("/RandomProcess", "PUT")
export class UpdateRandomProcess implements IReturn<RandomProcess>
{
    public id: number;
    public ncms_id: string;
    public phmsa?: boolean;
    public fmcsa?: boolean;
    public fra?: boolean;
    public faa?: boolean;
    public uscg?: boolean;
    public tpa_phmsa?: boolean;
    public tpa_fmcsa?: boolean;
    public tpa_fra?: boolean;
    public tpa_faa?: boolean;
    public tpa_uscg?: boolean;
    public fra_drug_precent?: number;
    public fra_alcohol_percent?: number;
    public phmsa_drug_precent?: number;
    public fmcsa_drug_percent?: number;
    public fmcsa_alcohol_percent?: number;
    public faa_drug_percent?: number;
    public faa_alcohol_percent?: number;
    public uscg_drug_percent?: number;
    public selection_frequency: string;
    public consortium_pool: string;
    public alternate_draws: string;
    public alternate_draws_explanation: string;
    public random_draw_documentation: string;
    public random_draws_explanation: string;
    public generator: string;
    public generator_explanation: string;

    public constructor(init?: Partial<UpdateRandomProcess>) { (Object as any).assign(this, init); }
    public createResponse() { return new RandomProcess(); }
    public getTypeName() { return 'UpdateRandomProcess'; }
}

// @Route("/RandomProcess/{id}", "DELETE")
export class DeleteRandomProcess
{
    public id: number;

    public constructor(init?: Partial<DeleteRandomProcess>) { (Object as any).assign(this, init); }
}

// @Route("/ReturnToDuty/{ncms_id}", "GET")
export class GetReturnToDuty implements IReturn<ReturnToDuty>
{
    public ncms_id: string;
    public asOf?: string;

    public constructor(init?: Partial<GetReturnToDuty>) { (Object as any).assign(this, init); }
    public createResponse() { return new ReturnToDuty(); }
    public getTypeName() { return 'GetReturnToDuty'; }
}

// @Route("/ReturnToDuty", "POST")
export class StoreReturnToDuty implements IReturn<ReturnToDuty>
{
    public ncms_id: string;
    public saprtd_process: string;
    public saprtd_agree?: boolean;
    public saprtd_explanation: string;
    public saprtd_referral_list: string;

    public constructor(init?: Partial<StoreReturnToDuty>) { (Object as any).assign(this, init); }
    public createResponse() { return new ReturnToDuty(); }
    public getTypeName() { return 'StoreReturnToDuty'; }
}

// @Route("/ReturnToDuty", "PUT")
export class UpdateReturnToDuty implements IReturn<ReturnToDuty>
{
    public id: number;
    public ncms_id: string;
    public saprtd_process: string;
    public saprtd_agree?: boolean;
    public saprtd_explanation: string;
    public saprtd_referral_list: string;

    public constructor(init?: Partial<UpdateReturnToDuty>) { (Object as any).assign(this, init); }
    public createResponse() { return new ReturnToDuty(); }
    public getTypeName() { return 'UpdateReturnToDuty'; }
}

// @Route("/ReturnToDuty/{id}", "DELETE")
export class DeleteReturnToDuty
{
    public id: number;

    public constructor(init?: Partial<DeleteReturnToDuty>) { (Object as any).assign(this, init); }
}

// @Route("/query/Roles", "GET")
export class FindRoles extends QueryDb<Role> implements IReturn<QueryResponse<Role>>
{
    public roleName: string;
    public isAdmin?: boolean;
    public skip?: number;
    public take?: number;
    public orderBy: string;
    public orderByDesc: string;
    public include: string;

    public constructor(init?: Partial<FindRoles>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Role>(); }
    public getTypeName() { return 'FindRoles'; }
}

// @Route("/Role/", "GET")
// @Route("/Role/{id}", "GET")
export class GetRole implements IReturn<Role>
{
    public id: string;

    public constructor(init?: Partial<GetRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'GetRole'; }
}

// @Route("/Role/", "POST")
export class PostRole implements IReturn<Role>
{
    public name: string;
    public isAdmin: boolean;
    public description: string;
    public permissions: string[];

    public constructor(init?: Partial<PostRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'PostRole'; }
}

// @Route("/Role/{Id}", "PUT")
export class PutRole implements IReturn<Role>
{
    public id: string;
    public name: string;
    public isAdmin: boolean;
    public description: string;
    public permissions: string[];

    public constructor(init?: Partial<PutRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'PutRole'; }
}

// @Route("/Role/{id}", "DELETE")
export class DeleteRole implements IReturn<Role>
{
    public id: string;

    public constructor(init?: Partial<DeleteRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'DeleteRole'; }
}

// @Route("/Role/copy", "POST")
export class CopyRole implements IReturn<Role>
{
    public id: string;
    public name: string;
    public description: string;

    public constructor(init?: Partial<CopyRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'CopyRole'; }
}

// @Route("/Role/{id}/addPermissions", "POST")
export class PostAddPermissionsToRole implements IReturn<Role>
{
    public id: string;
    public permissionNames: string[];

    public constructor(init?: Partial<PostAddPermissionsToRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'PostAddPermissionsToRole'; }
}

// @Route("/Role/{id}/deletePermissions", "DELETE")
export class DeletePermissionsToRole implements IReturn<Role>
{
    public id: string;
    public permissionNames: string[];

    public constructor(init?: Partial<DeletePermissionsToRole>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'DeletePermissionsToRole'; }
}

// @Route("/StatisticalData/{id}", "GET")
export class GetStatisticalData implements IReturn<StatisticalData>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetStatisticalData>) { (Object as any).assign(this, init); }
    public createResponse() { return new StatisticalData(); }
    public getTypeName() { return 'GetStatisticalData'; }
}

// @Route("/StatisticalData", "POST")
export class StoreStatisticalData implements IReturn<StatisticalData>
{
    public ncms_id: string;
    public file_id: number;
    public report_year: number;
    public report_period: number;

    public constructor(init?: Partial<StoreStatisticalData>) { (Object as any).assign(this, init); }
    public createResponse() { return new StatisticalData(); }
    public getTypeName() { return 'StoreStatisticalData'; }
}

// @Route("/StatisticalData", "PUT")
export class UpdateStatisticalData implements IReturn<StatisticalData>
{
    public id: number;
    public ncms_id: string;
    public file_id: number;
    public report_year: number;
    public report_period: number;

    public constructor(init?: Partial<UpdateStatisticalData>) { (Object as any).assign(this, init); }
    public createResponse() { return new StatisticalData(); }
    public getTypeName() { return 'UpdateStatisticalData'; }
}

// @Route("/StatisticalData/{id}", "DELETE")
export class DeleteStatisticalData
{
    public id: number;

    public constructor(init?: Partial<DeleteStatisticalData>) { (Object as any).assign(this, init); }
}

// @Route("/Subcontractor/{id}", "GET")
export class GetSubcontractor implements IReturn<Subcontractor>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetSubcontractor>) { (Object as any).assign(this, init); }
    public createResponse() { return new Subcontractor(); }
    public getTypeName() { return 'GetSubcontractor'; }
}

// @Route("/Subcontractor", "POST")
export class StoreSubcontractor implements IReturn<Subcontractor>
{
    public ncms_id: string;
    public company_name: string;
    public contact: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public phone: string;
    public type_of_work: string;
    public operator_list: string;
    public phmsa_job_functions: string;
    public email: string;

    public constructor(init?: Partial<StoreSubcontractor>) { (Object as any).assign(this, init); }
    public createResponse() { return new Subcontractor(); }
    public getTypeName() { return 'StoreSubcontractor'; }
}

// @Route("/Subcontractor", "PUT")
export class UpdateSubcontractor implements IReturn<Subcontractor>
{
    public id: number;
    public ncms_id: string;
    public company_name: string;
    public contact: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public phone: string;
    public type_of_work: string;
    public operator_list: string;
    public phmsa_job_functions: string;
    public email: string;

    public constructor(init?: Partial<UpdateSubcontractor>) { (Object as any).assign(this, init); }
    public createResponse() { return new Subcontractor(); }
    public getTypeName() { return 'UpdateSubcontractor'; }
}

// @Route("/Subcontractor/{id}", "DELETE")
export class DeleteSubcontractor
{
    public id: number;

    public constructor(init?: Partial<DeleteSubcontractor>) { (Object as any).assign(this, init); }
}

// @Route("/Supervisor/{id}", "GET")
export class GetSupervisor implements IReturn<Supervisor>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetSupervisor>) { (Object as any).assign(this, init); }
    public createResponse() { return new Supervisor(); }
    public getTypeName() { return 'GetSupervisor'; }
}

// @Route("/Supervisor", "POST")
export class StoreSupervisor implements IReturn<Supervisor>
{
    public ncms_id: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public drug_training_date?: string;
    public alcohol_training_date?: string;

    public constructor(init?: Partial<StoreSupervisor>) { (Object as any).assign(this, init); }
    public createResponse() { return new Supervisor(); }
    public getTypeName() { return 'StoreSupervisor'; }
}

// @Route("/Supervisor", "PUT")
export class UpdateSupervisor implements IReturn<Supervisor>
{
    public id: number;
    public ncms_id: string;
    public first_name: string;
    public last_name: string;
    public last4_empid: string;
    public drug_training_date?: string;
    public alcohol_training_date?: string;

    public constructor(init?: Partial<UpdateSupervisor>) { (Object as any).assign(this, init); }
    public createResponse() { return new Supervisor(); }
    public getTypeName() { return 'UpdateSupervisor'; }
}

// @Route("/Supervisor/{id}", "DELETE")
export class DeleteSupervisor
{
    public id: number;

    public constructor(init?: Partial<DeleteSupervisor>) { (Object as any).assign(this, init); }
}

// @Route("/TestingForm/{id}", "GET")
export class GetTestingForm implements IReturn<TestingForm>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<GetTestingForm>) { (Object as any).assign(this, init); }
    public createResponse() { return new TestingForm(); }
    public getTypeName() { return 'GetTestingForm'; }
}

// @Route("/TestingForm", "POST")
export class StoreTestingForm implements IReturn<TestingForm>
{
    public ncms_id: string;
    public file_id: number;

    public constructor(init?: Partial<StoreTestingForm>) { (Object as any).assign(this, init); }
    public createResponse() { return new TestingForm(); }
    public getTypeName() { return 'StoreTestingForm'; }
}

// @Route("/TestingForm", "PUT")
export class UpdateTestingForm implements IReturn<TestingForm>
{
    public id: number;
    public ncms_id: string;
    public file_id: number;

    public constructor(init?: Partial<UpdateTestingForm>) { (Object as any).assign(this, init); }
    public createResponse() { return new TestingForm(); }
    public getTypeName() { return 'UpdateTestingForm'; }
}

// @Route("/TestingForm/{id}", "DELETE")
export class DeleteTestingForm
{
    public id: number;

    public constructor(init?: Partial<DeleteTestingForm>) { (Object as any).assign(this, init); }
}

// @Route("/User", "GET")
// @Route("/User/{id}", "GET")
export class GetUser implements IReturn<User>
{
    public id: string;

    public constructor(init?: Partial<GetUser>) { (Object as any).assign(this, init); }
    public createResponse() { return new User(); }
    public getTypeName() { return 'GetUser'; }
}

// @Route("/User/", "POST")
export class PostUser implements IReturn<User>
{
    public applicationid: string;
    public firstname: string;
    public lastname: string;
    public username: string;
    public email: string;

    public constructor(init?: Partial<PostUser>) { (Object as any).assign(this, init); }
    public createResponse() { return new User(); }
    public getTypeName() { return 'PostUser'; }
}

// @Route("/User/", "DELETE")
export class DeleteUser
{
    public id: string;

    public constructor(init?: Partial<DeleteUser>) { (Object as any).assign(this, init); }
}

// @Route("/User/{Id}/addrole", "POST")
export class PostAddRoleToUser implements IReturn<Role>
{
    public id: string;
    public roleId: string;

    public constructor(init?: Partial<PostAddRoleToUser>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'PostAddRoleToUser'; }
}

// @Route("/User/{Id}/deleterole", "DELETE")
export class DeleteRoleFromUser implements IReturn<Role>
{
    public id: string;
    public roleId: string;

    public constructor(init?: Partial<DeleteRoleFromUser>) { (Object as any).assign(this, init); }
    public createResponse() { return new Role(); }
    public getTypeName() { return 'DeleteRoleFromUser'; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe?: boolean;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=16)
    public useTokenCookie?: boolean;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public scope: string;

    // @DataMember(Order=20)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuthenticateResponse(); }
    public getTypeName() { return 'Authenticate'; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AssignRoles>) { (Object as any).assign(this, init); }
    public createResponse() { return new AssignRolesResponse(); }
    public getTypeName() { return 'AssignRoles'; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<UnAssignRoles>) { (Object as any).assign(this, init); }
    public createResponse() { return new UnAssignRolesResponse(); }
    public getTypeName() { return 'UnAssignRoles'; }
}

// @Route("/query/AddlInfoAnswer/", "GET")
export class FindAddlInfoAnswer extends QueryDb<AddlInfoAnswer> implements IReturn<QueryResponse<AddlInfoAnswer>>
{

    public constructor(init?: Partial<FindAddlInfoAnswer>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<AddlInfoAnswer>(); }
    public getTypeName() { return 'FindAddlInfoAnswer'; }
}

// @Route("/query/AddlInfoQuestion/", "GET")
export class FindAddlInfoQuestion extends QueryDb<AddlInfoQuestion> implements IReturn<QueryResponse<AddlInfoQuestion>>
{

    public constructor(init?: Partial<FindAddlInfoQuestion>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<AddlInfoQuestion>(); }
    public getTypeName() { return 'FindAddlInfoQuestion'; }
}

// @Route("/query/AuditMessageComment", "GET")
export class FindAuditMessageComment extends QueryDb<AuditMessageComment> implements IReturn<QueryResponse<AuditMessageComment>>
{

    public constructor(init?: Partial<FindAuditMessageComment>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<AuditMessageComment>(); }
    public getTypeName() { return 'FindAuditMessageComment'; }
}

// @Route("/query/AuditMessage/", "GET")
export class FindAuditMessage extends QueryDb<AuditMessage> implements IReturn<QueryResponse<AuditMessage>>
{

    public constructor(init?: Partial<FindAuditMessage>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<AuditMessage>(); }
    public getTypeName() { return 'FindAuditMessage'; }
}

// @Route("/query/AuditMessageTemplate/", "GET")
export class FindAuditMessageTemplate extends QueryDb<AuditMessageTemplate> implements IReturn<QueryResponse<AuditMessageTemplate>>
{

    public constructor(init?: Partial<FindAuditMessageTemplate>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<AuditMessageTemplate>(); }
    public getTypeName() { return 'FindAuditMessageTemplate'; }
}

// @Route("/query/AuditMessageTemplateVersion/", "GET")
export class FindAuditMessageTemplateVersion extends QueryDb<AuditMessageTemplateVersion> implements IReturn<QueryResponse<AuditMessageTemplateVersion>>
{

    public constructor(init?: Partial<FindAuditMessageTemplateVersion>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<AuditMessageTemplateVersion>(); }
    public getTypeName() { return 'FindAuditMessageTemplateVersion'; }
}

// @Route("/query/Audit/", "GET")
export class FindAudit extends QueryDb<Audit> implements IReturn<QueryResponse<Audit>>
{

    public constructor(init?: Partial<FindAudit>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Audit>(); }
    public getTypeName() { return 'FindAudit'; }
}

// @Route("/query/Comment/", "GET")
export class FindComment extends QueryDb<Comment> implements IReturn<QueryResponse<Comment>>
{

    public constructor(init?: Partial<FindComment>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Comment>(); }
    public getTypeName() { return 'FindComment'; }
}

// @Route("/query/Company/", "GET")
export class FindCompanies extends QueryDb<Company> implements IReturn<QueryResponse<Company>>
{

    public constructor(init?: Partial<FindCompanies>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Company>(); }
    public getTypeName() { return 'FindCompanies'; }
}

// @Route("/query/Contact", "GET")
export class FindContact extends QueryDb<Contact> implements IReturn<QueryResponse<Contact>>
{

    public constructor(init?: Partial<FindContact>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Contact>(); }
    public getTypeName() { return 'FindContact'; }
}

// @Route("/query/CoveredPosition/", "GET")
export class FindCoveredPosition extends QueryDb<CoveredPosition> implements IReturn<QueryResponse<CoveredPosition>>
{

    public constructor(init?: Partial<FindCoveredPosition>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<CoveredPosition>(); }
    public getTypeName() { return 'FindCoveredPosition'; }
}

// @Route("/query/CR_GREF_Employee/", "GET")
export class FindCR_GREF_Employee extends QueryDb<CR_GREF_Employee> implements IReturn<QueryResponse<CR_GREF_Employee>>
{

    public constructor(init?: Partial<FindCR_GREF_Employee>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<CR_GREF_Employee>(); }
    public getTypeName() { return 'FindCR_GREF_Employee'; }
}

// @Route("/query/CR_JobFunction/", "GET")
export class FindCR_JobFunction extends QueryDb<CR_JobFunction> implements IReturn<QueryResponse<CR_JobFunction>>
{

    public constructor(init?: Partial<FindCR_JobFunction>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<CR_JobFunction>(); }
    public getTypeName() { return 'FindCR_JobFunction'; }
}

// @Route("/query/CR_Policy/", "GET")
export class FindCR_Policy extends QueryDb<CR_Policy> implements IReturn<QueryResponse<CR_Policy>>
{
    public id: number;
    public asOf?: string;

    public constructor(init?: Partial<FindCR_Policy>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<CR_Policy>(); }
    public getTypeName() { return 'FindCR_Policy'; }
}

// @Route("/query/CR_TB_Policy/", "GET")
export class FindCR_TB_Policy extends QueryDb<CR_TB_Policy> implements IReturn<QueryResponse<CR_TB_Policy>>
{

    public constructor(init?: Partial<FindCR_TB_Policy>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<CR_TB_Policy>(); }
    public getTypeName() { return 'FindCR_TB_Policy'; }
}

// @Route("/query/CR_TestingProtocolLab/", "GET")
export class FindCR_TestingProtocolLab extends QueryDb<CR_TestingProtocolLab> implements IReturn<QueryResponse<CR_TestingProtocolLab>>
{

    public constructor(init?: Partial<FindCR_TestingProtocolLab>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<CR_TestingProtocolLab>(); }
    public getTypeName() { return 'FindCR_TestingProtocolLab'; }
}

// @Route("/query/Employee/", "GET")
export class FindEmployee extends QueryDb<Employee> implements IReturn<QueryResponse<Employee>>
{

    public constructor(init?: Partial<FindEmployee>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Employee>(); }
    public getTypeName() { return 'FindEmployee'; }
}

// @Route("/query/EmployeeValidationFile/", "GET")
export class FindEmployeeValidationFile extends QueryDb<EmployeeValidationFile> implements IReturn<QueryResponse<EmployeeValidationFile>>
{

    public constructor(init?: Partial<FindEmployeeValidationFile>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<EmployeeValidationFile>(); }
    public getTypeName() { return 'FindEmployeeValidationFile'; }
}

// @Route("/query/EmployeeValidation/", "GET")
export class FindEmployeeValidation extends QueryDb<EmployeeValidation> implements IReturn<QueryResponse<EmployeeValidation>>
{

    public constructor(init?: Partial<FindEmployeeValidation>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<EmployeeValidation>(); }
    public getTypeName() { return 'FindEmployeeValidation'; }
}

// @Route("/EmployeeValidation/", "GET")
export class GetListEmployeeValidation extends QueryDb<EmployeeValidation> implements IReturn<QueryResponse<EmployeeValidation>>
{

    public constructor(init?: Partial<GetListEmployeeValidation>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<EmployeeValidation>(); }
    public getTypeName() { return 'GetListEmployeeValidation'; }
}

// @Route("/query/File/", "GET")
export class FindFile extends QueryDb<File> implements IReturn<QueryResponse<File>>
{

    public constructor(init?: Partial<FindFile>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<File>(); }
    public getTypeName() { return 'FindFile'; }
}

// @Route("/query/HelpContent/", "GET")
export class FindHelpContent extends QueryDb<HelpContent> implements IReturn<QueryResponse<HelpContent>>
{

    public constructor(init?: Partial<FindHelpContent>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<HelpContent>(); }
    public getTypeName() { return 'FindHelpContent'; }
}

// @Route("/query/HelpContentVersion/", "GET")
export class FindHelpContentVersion extends QueryDb<HelpContentVersion> implements IReturn<QueryResponse<HelpContentVersion>>
{

    public constructor(init?: Partial<FindHelpContentVersion>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<HelpContentVersion>(); }
    public getTypeName() { return 'FindHelpContentVersion'; }
}

// @Route("/query/HistoryCheckForm/", "GET")
export class FindHistoryCheckForm extends QueryDb<HistoryCheckForm> implements IReturn<QueryResponse<HistoryCheckForm>>
{

    public constructor(init?: Partial<FindHistoryCheckForm>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<HistoryCheckForm>(); }
    public getTypeName() { return 'FindHistoryCheckForm'; }
}

// @Route("/query/MedicalReviewOfficer/", "GET")
export class FindMedicalReviewOfficer extends QueryDb<MedicalReviewOfficer> implements IReturn<QueryResponse<MedicalReviewOfficer>>
{

    public constructor(init?: Partial<FindMedicalReviewOfficer>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<MedicalReviewOfficer>(); }
    public getTypeName() { return 'FindMedicalReviewOfficer'; }
}

// @Route("/query/MessageTemplate/", "GET")
export class FindMessageTemplate extends QueryDb<MessageTemplate> implements IReturn<QueryResponse<MessageTemplate>>
{

    public constructor(init?: Partial<FindMessageTemplate>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<MessageTemplate>(); }
    public getTypeName() { return 'FindMessageTemplate'; }
}

// @Route("/query/MessageTemplateVersion/", "GET")
export class FindMessageTemplateVersion extends QueryDb<MessageTemplateVersion> implements IReturn<QueryResponse<MessageTemplateVersion>>
{

    public constructor(init?: Partial<FindMessageTemplateVersion>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<MessageTemplateVersion>(); }
    public getTypeName() { return 'FindMessageTemplateVersion'; }
}

// @Route("/query/ModelPlan/", "GET")
export class FindModelPlan extends QueryDb<ModelPlan> implements IReturn<QueryResponse<ModelPlan>>
{

    public constructor(init?: Partial<FindModelPlan>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<ModelPlan>(); }
    public getTypeName() { return 'FindModelPlan'; }
}

// @Route("/query/ModelPlanTermAgreement/", "GET")
export class FindModelPlanTermAgreement extends QueryDb<ModelPlanTermAgreement> implements IReturn<QueryResponse<ModelPlanTermAgreement>>
{

    public constructor(init?: Partial<FindModelPlanTermAgreement>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<ModelPlanTermAgreement>(); }
    public getTypeName() { return 'FindModelPlanTermAgreement'; }
}

// @Route("/query/NotificationEventRecord/", "GET")
export class FindNotificationEventRecord extends QueryDb<NotificationEventRecord> implements IReturn<QueryResponse<NotificationEventRecord>>
{

    public constructor(init?: Partial<FindNotificationEventRecord>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<NotificationEventRecord>(); }
    public getTypeName() { return 'FindNotificationEventRecord'; }
}

// @Route("/query/NotificationEvent/", "GET")
export class FindNotificationEvent extends QueryDb<NotificationEvent> implements IReturn<QueryResponse<NotificationEvent>>
{

    public constructor(init?: Partial<FindNotificationEvent>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<NotificationEvent>(); }
    public getTypeName() { return 'FindNotificationEvent'; }
}

// @Route("/query/Notification/", "GET")
export class FindNotification extends QueryDb<Notification> implements IReturn<QueryResponse<Notification>>
{

    public constructor(init?: Partial<FindNotification>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Notification>(); }
    public getTypeName() { return 'FindNotification'; }
}

// @Route("/query/Policy/", "GET")
export class FindPolicy extends QueryDb<Policy> implements IReturn<QueryResponse<Policy>>
{

    public constructor(init?: Partial<FindPolicy>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Policy>(); }
    public getTypeName() { return 'FindPolicy'; }
}

// @Route("/query/RandomProcess/", "GET")
export class FindRandomProcess extends QueryDb<RandomProcess> implements IReturn<QueryResponse<RandomProcess>>
{

    public constructor(init?: Partial<FindRandomProcess>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<RandomProcess>(); }
    public getTypeName() { return 'FindRandomProcess'; }
}

// @Route("/query/ReturnToDuty/", "GET")
export class FindReturnToDuty extends QueryDb<ReturnToDuty> implements IReturn<QueryResponse<ReturnToDuty>>
{

    public constructor(init?: Partial<FindReturnToDuty>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<ReturnToDuty>(); }
    public getTypeName() { return 'FindReturnToDuty'; }
}

// @Route("/query/StatisticalData/", "GET")
export class FindStatisticalData extends QueryDb<StatisticalData> implements IReturn<QueryResponse<StatisticalData>>
{

    public constructor(init?: Partial<FindStatisticalData>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<StatisticalData>(); }
    public getTypeName() { return 'FindStatisticalData'; }
}

// @Route("/query/Subcontractor/", "GET")
export class FindSubcontractor extends QueryDb<Subcontractor> implements IReturn<QueryResponse<Subcontractor>>
{

    public constructor(init?: Partial<FindSubcontractor>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Subcontractor>(); }
    public getTypeName() { return 'FindSubcontractor'; }
}

// @Route("/query/Supervisor/", "GET")
export class FindSupervisor extends QueryDb<Supervisor> implements IReturn<QueryResponse<Supervisor>>
{

    public constructor(init?: Partial<FindSupervisor>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<Supervisor>(); }
    public getTypeName() { return 'FindSupervisor'; }
}

// @Route("/query/TestingForm/", "GET")
export class FindTestingForm extends QueryDb<TestingForm> implements IReturn<QueryResponse<TestingForm>>
{

    public constructor(init?: Partial<FindTestingForm>) { super(init); (Object as any).assign(this, init); }
    public createResponse() { return new QueryResponse<TestingForm>(); }
    public getTypeName() { return 'FindTestingForm'; }
}

