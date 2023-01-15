import { AxiosError } from "axios";
import Response from "./Response";
import DataException from "./Response/DataException";

interface ResponseException extends Response {
    data: DataException
}

interface Error extends AxiosError {
    code: string
    response: ResponseException
}

export default Error