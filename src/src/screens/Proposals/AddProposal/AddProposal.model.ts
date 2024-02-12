export class ProposalRequest {
  id: string = "";
  requestId: string = "";
  source: string = "";
  title: string = "";
  agency: Entity = new Entity();
  contacts: Entity[] = [];
  type: string = "";
  domain: string = "";
  subDomain: string = "";
  contractType: string = "";
  contractDetailsUrl: string = "";
  submissionType: string = "";
  status: string = "";
  issueDate: string = "";
  dueDate: string = "";
  metadata: Metadata[] = [];
  comments: any[] = [];
  action: string = "";
  price: number = 0;
  complexity: string = "";
  competitionType: string = "";
  proposalEvaluation: ProposalEvaluation = new ProposalEvaluation();
  ownerEmail: string = "";
  ownerName: string = "";
  assigneeName: string = "";
  assigneeId: string = "";
  region: string = "";
}

export class Competitive {
  id: string = "";
  requestId: string = "";
  source: string = "";
  title: string = "";
  type: string = "";
  domain: string = "";
  agency: Entity = new Entity();
  comments: Comment[] = [];
  metadata: Metadata[] = [];
  price: number = 0;
}

export class Entity {
  name: string = "";
  email?: string = "";
  contactNo?: string = "";
  webSite?: string = "";
  address: Address = new Address();
}

export class ProposalEvaluation {
  title: string = "";
  agency: Entity = new Entity();
  contractDetailsUrl: string = "";
  comments: Comment[] = [];
  price: number = 0;
}

export class RfpTarget {
  id: string = "";
  value: Object[] = [];
  comment: string = "";
}
export class Address {
  line1: string = "";
  line2: string = "";
  line3: string = "";
  line4: string = "";
  city: string = "";
  state: string = "";
  pinCode: string = "";
  country: string = "";
}
export class Metadata {
  entityType: string = "";
  entityContext: string = "";
  name: string = "";
  value: string = "";
  mandatory: boolean = false;
  dataType: string = "";
  webComponentType: string = "";
  webComponentSource: string = "";
}

export class UserTask {
  processInstanceId: number = 0;
  id: number = 0;
  name: string = "";
  description: string = "";
  priority: string = "";
  type: string = "";
  assigneeId: string = "";
  assigneeName: string = "";
  dueDate: any = "";
  comments: string[] = [];
  status: string = "";
  formUrl: string = "";
  url: string = "";
  process: string = "";
  businessKey: string = "";
  data: TaskData[] = [];
  reminder: TaskReminder = new TaskReminder();
  audit: Audit = new Audit();
  defId: string = "";
  docUrls: any = [];
}

export class userDocument {
  comment: string = "";
  content: string = "";
  expiryDate: string = "";
  fileName: string = "";
  id: string = "";
  interval: number = 0;
  issueDate: string = "";
  metaData: string[] = [];
  ownerId: string = "";
  path: string = "";
  status: string = "";
  title: string = "";
  type: string = "";
}

export class TaskReminder {
  enabled: string = "N";
  repeatCycle: number = 1;
  repeatFrequency: number = 24;
}

export class TaskData {
  name: string = "";
  value: string = "";
}
export class Audit {
  fromZ: Date = new Date();
  thruZ: Date = new Date();
  createdBy: string = "";
  updatedBy: string = "";
}
