import { Error } from '../Error/Error';

export class GenericResponse<T> {
    isSuccess: boolean;
    error: Error;
    data: T;
}