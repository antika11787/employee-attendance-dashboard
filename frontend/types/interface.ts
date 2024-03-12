interface FileUpload {
  file?: File | null;
}

interface FileResponse {
  employee: String;
  employee_id: String;
  check_in: Date;
  check_out: Date;
  worked_hours: Number;
  late_hours: Number;
  early_leave_hours: Number;
  over_time: Number;
}
[];

interface FileResponseRaw {
  Employee: String;
  "Employee ID": String;
  "Check In": Date;
  "Check Out": Date;
  "Worked Hours (H.M)": Number;
  "Late Hours (H.M)": Number;
  "Early Leave Hours (H.M)": Number;
  "Over Time (H.M)": Number;
}

export type { FileUpload, FileResponse, FileResponseRaw };
