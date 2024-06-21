import {Component, inject, OnInit} from '@angular/core';
import {ListRequest, UserDto, UsersApi} from "./services/users.api";
import {BehaviorSubject, debounceTime, mergeMap, Subject, takeUntil, tap} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{

    public loading: boolean = false;
    public viewType: boolean;

    private _usersApiService: UsersApi = inject(UsersApi);
    private _queryData$: BehaviorSubject<ListRequest> = new BehaviorSubject<ListRequest>({
        pageNumber: 1,
        itemsPerPage: 5
    })
    private _unsubscriber$: Subject<void> = new Subject<void>();

    public userList$ = this._queryData$
        .pipe(
            takeUntil(this._unsubscriber$),
            tap(() => this.loading = true),
            debounceTime(500),
            mergeMap((data) => {
                return this._usersApiService.getList(data)
                    .pipe(
                        tap(() => this.loading = false)
                    )
            })
        )


    public onPageChange(page: number): void {
        const obj: ListRequest = this._queryData$.getValue();
        obj.pageNumber = page
        this._queryData$.next(obj);

    }

    public onItemsPerPageChange(itemsPerPage: number): void {
        const obj: ListRequest = this._queryData$.getValue();
        obj.itemsPerPage = itemsPerPage
        obj.pageNumber = 1
        this._queryData$.next(obj);
    }

    public onSearchChange(event: any): void {
        const obj: ListRequest = this._queryData$.getValue();
        obj.search = event.value;
        this._queryData$.next(obj);
    }


    public switchViewType(event: boolean): void {
        this.viewType = event;
    }

    public removeItem(model: UserDto) {
        this._usersApiService.remove(model.id);
        this._queryData$.next(this._queryData$.getValue())
    }


}
