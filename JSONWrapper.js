const fs = require('fs');
require('dotenv').config();

class JSONWrapper {
    constructor() {
        this.data = null;
        this.dataPath = process.env.dataPath;

        this._loadData();
    }

    _loadData = () => {
        if(this.data == null) {
            let rawData = fs.readFileSync(this.dataPath);
            let data = JSON.parse(rawData);
            this.data = data;
        }
        return this.data;
    }

    _isTableExisting = (table) => {
        return table in this.data;
    }

    _isRowExisting = (table, row) => {
        if(this._isTableExisting(table)) {
            return row in this.data[table];
        } else {
            return false;
        }
    }

    getRow = (table, row) => {
        if(this._isTableExisting(table) && this._isRowExisting(table, row)) {
            return this.data[table][row];
        } else {
            return false;
        }
    }

    getAllRows = (table) => {
        if(this._isTableExisting(table)) {
            return this.data[table];
        } else {
            return false;
        }
    }

    deleteRow = (table, row) => {
        if(this._isTableExisting(table) && this._isRowExisting(table, row)) {
            delete this.data[table][row];
            fs.writeFileSync(this.dataPath, JSON.stringify(this.data));
        }
    }

    addRow = (table, row, value) => {
        if(this._isTableExisting(table)) {
            this.data[table][row] = value;
            fs.writeFileSync(this.dataPath, JSON.stringify(this.data));
        }
    }
}

module.exports = JSONWrapper;