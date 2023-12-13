export interface DepartmentItemProps {
  department: {
    name: string;
    location: string;
    description: string;
    businessHours: string;
    phoneNumber: string;
    count: number;
    recent: string;
    imageUrl?: string;
  };
}
