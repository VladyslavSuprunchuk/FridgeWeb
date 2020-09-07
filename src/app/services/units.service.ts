import { Injectable } from '@angular/core';
import { ServerConnectionService } from '../services/server-connection.service';
import { Unit } from '../models/unit';
import { GenericResponse } from '../models/generic-response'

@Injectable({
    providedIn: 'root'
})
export class UnitsService {
    private _units: Unit[];

    constructor(private server: ServerConnectionService) { }

    get units() {
        if (this._units == null || this._units.length == 0) {
            this.server.getQuery<GenericResponse<Unit[]>>('/unit').subscribe(data => {
                if (data.isSuccess) {
                    this._units = data.data;
                }
            });
        }
        return this._units;
    }
}