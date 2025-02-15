import { Injectable } from '@angular/core';
import {delay, from, Observable, of} from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UsersApi {
    private DB: UserDto[] = [
        { id: 'u1', user_name: 'Ivan Z.', is_active: true },
        { id: 'u2', user_name: 'Mikhail X.', is_active: true },
        { id: 'u3', user_name: 'Ivan C.', is_active: true },
        { id: 'u4', user_name: 'Petr V.', is_active: true },
        { id: 'u5', user_name: 'Artyom B.', is_active: true },
        { id: 'u6', user_name: 'Gleb N.', is_active: true },
        { id: 'u7', user_name: 'Anton M.', is_active: true },
        { id: 'u8', user_name: 'Semyon A.', is_active: true },
        { id: 'u9', user_name: 'Arseniy S.', is_active: true },
        { id: 'u10', user_name: 'Nick D.', is_active: true },
        { id: 'u11', user_name: 'Alex F.', is_active: true },
        { id: 'u12', user_name: 'Kirill G.', is_active: true },
        { id: 'u13', user_name: 'Stas H.', is_active: true },
        { id: 'u14', user_name: 'Yuriy J.', is_active: true },
        { id: 'u15', user_name: 'Roman K.', is_active: true },
        { id: 'u16', user_name: 'Ivan L.', is_active: true },
        { id: 'u17', user_name: 'Ivan Q.', is_active: true },
    ];

    public getList(request: ListRequest): Observable<UserListResponseDto> {
        let filteredUser = this.DB;
        if (request.search) {
            const searchLower = request.search.toLowerCase();
            filteredUser = this.DB.filter(user =>
                user.user_name.toLowerCase().includes(searchLower))
        }

        const totalCount = filteredUser.length
        const startIndex = (request.pageNumber - 1) * request.itemsPerPage;
        const endIndex = startIndex + request.itemsPerPage;
        const item = filteredUser.slice(startIndex, endIndex);

        return of({
            items: item,
            total_count: totalCount
        }).pipe(delay(3000))

    }

    public getById(id: string): Observable<UserDto> {
        return from(this.DB.filter((item) => item.id === id));
    }

    public remove(id: string): Observable<void> {
        this.DB = this.DB.filter((item) => item.id !== id);

        return of();
    }
}

export interface UserDto {
    id: string;
    user_name: string;
    is_active: boolean;
}

export interface ListRequest {
    pageNumber: number;
    search?: string;
    itemsPerPage: number;
}

export interface UserListResponseDto {
    total_count: number;
    items: UserDto[];
}
