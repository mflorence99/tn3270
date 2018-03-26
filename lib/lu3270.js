"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
var data_stream_1 = require("./data-stream");
var inbound_1 = require("./inbound");
var outbound_1 = require("./outbound");
var tn3270_1 = require("./tn3270");
var LU3270 = (function (_super) {
    __extends(LU3270, _super);
    function LU3270(host, port, model, numCols, numRows) {
        var _this = _super.call(this) || this;
        _this.host = host;
        _this.port = port;
        _this.model = model;
        _this.numCols = numCols;
        _this.numRows = numRows;
        _this.inbound = new inbound_1.Inbound(_this);
        _this.outbound = new outbound_1.Outbound(_this);
        _this.tn3270 = new tn3270_1.Tn3270(host, port, model);
        return _this;
    }
    LU3270.prototype.connect = function () {
        var _this = this;
        this.reset();
        this.disconnect();
        this.connection = this.tn3270.stream$.subscribe({
            next: function (data) {
                switch (data[0]) {
                    case data_stream_1.Command.EAU:
                    case data_stream_1.Command.EW:
                    case data_stream_1.Command.EWA:
                    case data_stream_1.Command.W:
                    case data_stream_1.Command.WSF:
                        var wcc = _this.outbound.process(data);
                        console.log(wcc.toString());
                        _this.emit('outbound');
                        break;
                    case data_stream_1.Command.RB:
                    case data_stream_1.Command.RM:
                    case data_stream_1.Command.RMA:
                        var buffer = _this.inbound.process(data);
                        _this.tn3270.write(buffer);
                        break;
                }
            },
            error: function (error) { return console.log(error); }
        });
    };
    LU3270.prototype.disconnect = function () {
        if (this.connection) {
            this.connection.unsubscribe();
            delete this.connection;
        }
    };
    LU3270.prototype.reset = function () {
        this.address = 0;
        this.aid = data_stream_1.AID.DEFAULT;
        this.buffer = new Array(this.numCols * this.numRows);
        this.cursor = 0;
    };
    return LU3270;
}(events.EventEmitter));
exports.LU3270 = LU3270;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHUzMjcwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2x1MzI3MC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUM7QUFFakMsNkNBQW1EO0FBRW5ELHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFFdEMsbUNBQWtDO0FBZ0JsQztJQUE0QiwwQkFBbUI7SUFhN0MsZ0JBQW1CLElBQVksRUFDWixJQUFZLEVBQ1osS0FBYSxFQUNiLE9BQWUsRUFDZixPQUFlO1FBSmxDLFlBS0UsaUJBQU8sU0FJUjtRQVRrQixVQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osVUFBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFdBQUssR0FBTCxLQUFLLENBQVE7UUFDYixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsYUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUVoQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNqQyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNuQyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7O0lBQzlDLENBQUM7SUFHRCx3QkFBTyxHQUFQO1FBQUEsaUJBeUJDO1FBeEJDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUM5QyxJQUFJLEVBQUUsVUFBQyxJQUFZO2dCQUNqQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixLQUFLLHFCQUFPLENBQUMsR0FBRyxDQUFDO29CQUNqQixLQUFLLHFCQUFPLENBQUMsRUFBRSxDQUFDO29CQUNoQixLQUFLLHFCQUFPLENBQUMsR0FBRyxDQUFDO29CQUNqQixLQUFLLHFCQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNmLEtBQUsscUJBQU8sQ0FBQyxHQUFHO3dCQUNkLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN0QixLQUFLLENBQUM7b0JBQ1IsS0FBSyxxQkFBTyxDQUFDLEVBQUUsQ0FBQztvQkFDaEIsS0FBSyxxQkFBTyxDQUFDLEVBQUUsQ0FBQztvQkFDaEIsS0FBSyxxQkFBTyxDQUFDLEdBQUc7d0JBQ2QsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQixLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNILENBQUM7WUFDRCxLQUFLLEVBQUUsVUFBQyxLQUFZLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQjtTQUM1QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsMkJBQVUsR0FBVjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBR0Qsc0JBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsaUJBQUcsQ0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBTyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUgsYUFBQztBQUFELENBQUMsQUFwRUQsQ0FBNEIsTUFBTSxDQUFDLFlBQVksR0FvRTlDO0FBcEVZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCB7IEFJRCwgQ2VsbCwgQ29tbWFuZCB9IGZyb20gJy4vZGF0YS1zdHJlYW0nO1xuXG5pbXBvcnQgeyBJbmJvdW5kIH0gZnJvbSAnLi9pbmJvdW5kJztcbmltcG9ydCB7IE91dGJvdW5kIH0gZnJvbSAnLi9vdXRib3VuZCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBUbjMyNzAgfSBmcm9tICcuL3RuMzI3MCc7XG5cbi8qKlxuICogTG9naWNhbCAzMjcwIGRldmljZVxuICpcbiAqIEBzZWUgaHR0cDovL3d3dy50b21teXNwcmlua2xlLmNvbS9tdnMvUDMyNzAvc3RhcnQuaHRtXG4gKiBAc2VlIGh0dHA6Ly9wdWJsaWJ6LmJvdWxkZXIuaWJtLmNvbS9jZ2ktYmluL2Jvb2ttZ3JfT1MzOTAvXG4gKiAgICAgICAgQk9PS1MvQ043UDQwMDAvQ0NPTlRFTlRTP0RUPTE5OTIwNjI2MTEyMDA0XG4gKiBAc2VlIGh0dHA6Ly93d3cuc2ltb3RpbWUuY29tL2FzYzJlYmMxLmh0bVxuICogQHNlZSBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL2VuL1xuICogICAgICAgIFNTR01DUF81LjUuMC9hcHBsaWNhdGlvbnMvZGVzaWduaW5nL2RmaHAzYjQuaHRtbFxuICogQHNlZSBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL2VuL1xuICogICAgICAgIFNTR01DUF81LjUuMC9hcHBsaWNhdGlvbnMvZGVzaWduaW5nL2RmaHAzYzcuaHRtbFxuICogQHNlZSBodHRwOi8vd3d3LnByeWNyb2Z0Ni5jb20uYXUvbWlzYy8zMjcwLmh0bWxcbiAqL1xuXG5leHBvcnQgY2xhc3MgTFUzMjcwIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG5cbiAgYWRkcmVzczogbnVtYmVyO1xuICBhaWQ6IEFJRDtcbiAgYnVmZmVyOiBDZWxsW107XG4gIGN1cnNvcjogbnVtYmVyO1xuXG4gIHByaXZhdGUgY29ubmVjdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGluYm91bmQ6IEluYm91bmQ7XG4gIHByaXZhdGUgb3V0Ym91bmQ6IE91dGJvdW5kO1xuICBwcml2YXRlIHRuMzI3MDogVG4zMjcwO1xuXG4gIC8qKiBjdG9yICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0OiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyBwb3J0OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgbnVtQ29sczogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgbnVtUm93czogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmluYm91bmQgPSBuZXcgSW5ib3VuZCh0aGlzKTtcbiAgICB0aGlzLm91dGJvdW5kID0gbmV3IE91dGJvdW5kKHRoaXMpO1xuICAgIHRoaXMudG4zMjcwID0gbmV3IFRuMzI3MChob3N0LCBwb3J0LCBtb2RlbCk7XG4gIH1cblxuICAvKiogQ29ubmVjdCB0byAzMjcwICovXG4gIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IHRoaXMudG4zMjcwLnN0cmVhbSQuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChkYXRhOiBCdWZmZXIpID0+IHtcbiAgICAgICAgc3dpdGNoIChkYXRhWzBdKSB7XG4gICAgICAgICAgY2FzZSBDb21tYW5kLkVBVTpcbiAgICAgICAgICBjYXNlIENvbW1hbmQuRVc6XG4gICAgICAgICAgY2FzZSBDb21tYW5kLkVXQTpcbiAgICAgICAgICBjYXNlIENvbW1hbmQuVzpcbiAgICAgICAgICBjYXNlIENvbW1hbmQuV1NGOlxuICAgICAgICAgICAgY29uc3Qgd2NjID0gdGhpcy5vdXRib3VuZC5wcm9jZXNzKGRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod2NjLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdvdXRib3VuZCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBDb21tYW5kLlJCOlxuICAgICAgICAgIGNhc2UgQ29tbWFuZC5STTpcbiAgICAgICAgICBjYXNlIENvbW1hbmQuUk1BOlxuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5pbmJvdW5kLnByb2Nlc3MoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnRuMzI3MC53cml0ZShidWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpXG4gICAgfSk7XG4gIH1cblxuICAvKiogRGlzY29ubmVjdCBmcm9tIDMyNzAgKi9cbiAgZGlzY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbm5lY3Rpb247XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlc2V0IGFuZCBzdGFydCBvdmVyICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYWRkcmVzcyA9IDA7XG4gICAgdGhpcy5haWQgPSBBSUQuREVGQVVMVDtcbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheTxDZWxsPih0aGlzLm51bUNvbHMgKiB0aGlzLm51bVJvd3MpO1xuICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgfVxuXG59XG4iXX0=