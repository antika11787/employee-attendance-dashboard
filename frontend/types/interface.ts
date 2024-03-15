interface FileUpload {
  file?: File | null;
}

interface FileResponse {
  employee: string;
  employee_id: string;
  check_in: string;
  check_out: string;
  worked_hours: number;
  late_hours: number;
  early_leave_hours: number;
  over_time: number;
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

interface FileState {
  file: {
    _id: string;
  };
}

interface totalEmployeeResponse {
  total?: string;
}

interface InputFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

interface FileHistoryData {
  _id: string;
  file_name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export type {
  FileUpload,
  FileResponse,
  FileResponseRaw,
  FileState,
  totalEmployeeResponse,
  InputFieldProps,
  FileHistoryData
};
