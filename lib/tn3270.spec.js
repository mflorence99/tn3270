"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var tn3270 = new _1.Tn3270('localhost', 3270, 'IBM-3278-4-E');
var connection = tn3270.stream$.subscribe({
    next: function (data) { return console.log(data); },
    error: function (error) { return console.log(error); },
    complete: function () { return console.log('All done!'); }
});
process.on('SIGINT', function () {
    console.log('Exit');
    connection.unsubscribe();
    process.exit();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG4zMjcwLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG4zMjcwLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1QkFBNEI7QUFFNUIsSUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFNLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM3RCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUMxQyxJQUFJLEVBQUUsVUFBQyxJQUFZLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQjtJQUN6QyxLQUFLLEVBQUUsVUFBQyxLQUFZLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQjtJQUMzQyxRQUFRLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQXhCLENBQXdCO0NBQ3pDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRuMzI3MCB9IGZyb20gJy4vJztcblxuY29uc3QgdG4zMjcwID0gbmV3IFRuMzI3MCgnbG9jYWxob3N0JywgMzI3MCwgJ0lCTS0zMjc4LTQtRScpO1xuY29uc3QgY29ubmVjdGlvbiA9IHRuMzI3MC5zdHJlYW0kLnN1YnNjcmliZSh7XG4gIG5leHQ6IChkYXRhOiBCdWZmZXIpID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpLFxuICBjb21wbGV0ZTogKCkgPT4gY29uc29sZS5sb2coJ0FsbCBkb25lIScpXG59KTtcblxucHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZygnRXhpdCcpO1xuICBjb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIHByb2Nlc3MuZXhpdCgpO1xufSk7XG4iXX0=