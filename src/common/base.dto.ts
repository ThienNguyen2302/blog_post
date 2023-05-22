import {plainToInstance} from "class-transformer"
export abstract class BaseDto {
    // @Expose()
    // id: string;

    // @Expose()
    // createdAt: Date;

    // @Expose()
    // updatedAt: Date;

    // @Expose()
    // deletedAt: Date;

    public static plainToClass <T> (this: new (...args: any[]) => T, obj: T): T {
        return plainToInstance
        (this, obj, {excludeExtraneousValues: true})
    }
}