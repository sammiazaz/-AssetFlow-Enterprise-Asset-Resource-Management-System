"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var prisma = new client_1.PrismaClient();
var firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
var lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
var getRandomName = function () { return "".concat(firstNames[Math.floor(Math.random() * firstNames.length)], " ").concat(lastNames[Math.floor(Math.random() * lastNames.length)]); };
var getRandomElement = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
var randomCost = function (min, max) { return parseFloat((Math.random() * (max - min) + min).toFixed(2)); };
var randomTag = function (prefix) { return "".concat(prefix, "-").concat(Math.floor(1000 + Math.random() * 9000)); };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categoryNames, categories, _i, categoryNames_1, cat, created, departmentNames, departments, _a, departmentNames_1, name_1, created, defaultPasswordHash, users, _b, _c, i, name_2, _d, _e, i, name_3, _f, _g, employees, i, name_4, dept, emp, assets, assetTemplates, sharedCategories, i, cat, names, name_5, isSharedBookable, asset, nonSharedAssets, i, asset, employee, h, sharedAssets, i, asset, employee, isPast, startTime, endTime, status_1, i, asset, requester, statuses, status_2, notificationTypes, i, type, read, text;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    console.log('Start seeding...');
                    // 1. Clean existing database records
                    return [4 /*yield*/, prisma.notification.deleteMany({})];
                case 1:
                    // 1. Clean existing database records
                    _h.sent();
                    return [4 /*yield*/, prisma.maintenanceRequest.deleteMany({})];
                case 2:
                    _h.sent();
                    return [4 /*yield*/, prisma.booking.deleteMany({})];
                case 3:
                    _h.sent();
                    return [4 /*yield*/, prisma.asset.deleteMany({})];
                case 4:
                    _h.sent();
                    return [4 /*yield*/, prisma.department.updateMany({ data: { headId: null } })];
                case 5:
                    _h.sent();
                    return [4 /*yield*/, prisma.user.deleteMany({})];
                case 6:
                    _h.sent();
                    return [4 /*yield*/, prisma.department.deleteMany({})];
                case 7:
                    _h.sent();
                    return [4 /*yield*/, prisma.category.deleteMany({})];
                case 8:
                    _h.sent();
                    categoryNames = [
                        { name: 'Laptops', fields: ['RAM', 'Storage', 'Processor'] },
                        { name: 'Monitors', fields: ['Resolution', 'Refresh Rate'] },
                        { name: 'Mobile Devices', fields: ['OS', 'IMEI'] },
                        { name: 'Furniture', fields: ['Material', 'Ergonomic'] },
                        { name: 'Vehicles', fields: ['License Plate', 'Mileage'] },
                        { name: 'Networking', fields: ['Ports', 'Speed'] },
                        { name: 'AV Equipment', fields: ['Resolution', 'Lumens'] },
                        { name: 'Software Licenses', fields: ['Key', 'Expiry Date'] }
                    ];
                    categories = [];
                    _i = 0, categoryNames_1 = categoryNames;
                    _h.label = 9;
                case 9:
                    if (!(_i < categoryNames_1.length)) return [3 /*break*/, 12];
                    cat = categoryNames_1[_i];
                    return [4 /*yield*/, prisma.category.create({
                            data: { name: cat.name, fields: JSON.stringify(cat.fields) }
                        })];
                case 10:
                    created = _h.sent();
                    categories.push(created);
                    _h.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 9];
                case 12:
                    departmentNames = ['Engineering', 'Human Resources', 'Operations', 'Finance', 'IT Support'];
                    departments = [];
                    _a = 0, departmentNames_1 = departmentNames;
                    _h.label = 13;
                case 13:
                    if (!(_a < departmentNames_1.length)) return [3 /*break*/, 16];
                    name_1 = departmentNames_1[_a];
                    return [4 /*yield*/, prisma.department.create({
                            data: { name: name_1, parentId: null, status: 'Active' }
                        })];
                case 14:
                    created = _h.sent();
                    departments.push(created);
                    _h.label = 15;
                case 15:
                    _a++;
                    return [3 /*break*/, 13];
                case 16: return [4 /*yield*/, bcryptjs_1.default.hash('password123', 10)];
                case 17:
                    defaultPasswordHash = _h.sent();
                    users = [];
                    // Admin
                    _c = (_b = users).push;
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: 'System Admin', email: 'admin@assetflow.com', role: 'Admin', status: 'Active', departmentId: departments[4].id, password: defaultPasswordHash }
                        })];
                case 18:
                    // Admin
                    _c.apply(_b, [_h.sent()]);
                    i = 0;
                    _h.label = 19;
                case 19:
                    if (!(i < 2)) return [3 /*break*/, 22];
                    name_2 = getRandomName();
                    _e = (_d = users).push;
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: name_2, email: "am".concat(i + 1, "@assetflow.com"), role: 'Asset Manager', status: 'Active', departmentId: departments[4].id, password: defaultPasswordHash }
                        })];
                case 20:
                    _e.apply(_d, [_h.sent()]);
                    _h.label = 21;
                case 21:
                    i++;
                    return [3 /*break*/, 19];
                case 22:
                    i = 0;
                    _h.label = 23;
                case 23:
                    if (!(i < 2)) return [3 /*break*/, 27];
                    name_3 = getRandomName();
                    _g = (_f = users).push;
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: name_3, email: "dh".concat(i + 1, "@assetflow.com"), role: 'Department Head', status: 'Active', departmentId: departments[i].id, password: defaultPasswordHash }
                        })];
                case 24:
                    _g.apply(_f, [_h.sent()]);
                    return [4 /*yield*/, prisma.department.update({ where: { id: departments[i].id }, data: { headId: users[users.length - 1].id } })];
                case 25:
                    _h.sent();
                    _h.label = 26;
                case 26:
                    i++;
                    return [3 /*break*/, 23];
                case 27:
                    employees = [];
                    i = 0;
                    _h.label = 28;
                case 28:
                    if (!(i < 20)) return [3 /*break*/, 31];
                    name_4 = getRandomName();
                    dept = getRandomElement(departments);
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: name_4, email: "emp".concat(i + 1, "@assetflow.com"), role: 'Employee', status: 'Active', departmentId: dept.id, password: defaultPasswordHash }
                        })];
                case 29:
                    emp = _h.sent();
                    users.push(emp);
                    employees.push(emp);
                    _h.label = 30;
                case 30:
                    i++;
                    return [3 /*break*/, 28];
                case 31:
                    assets = [];
                    assetTemplates = {
                        'Laptops': ['MacBook Pro M2', 'Dell XPS 15', 'Lenovo ThinkPad X1', 'HP EliteBook 840'],
                        'Monitors': ['Dell UltraSharp 27', 'LG 34-inch Ultrawide', 'BenQ Designer 32'],
                        'Mobile Devices': ['iPhone 14 Pro', 'Samsung Galaxy S23', 'iPad Pro 11-inch'],
                        'Furniture': ['Herman Miller Aeron', 'Steelcase Leap', 'Standing Desk'],
                        'Vehicles': ['Ford Transit Van', 'Toyota Prius Hybrid'],
                        'Networking': ['Cisco Meraki MR46', 'Ubiquiti UniFi AP', 'Netgear ProSafe Switch'],
                        'AV Equipment': ['Epson 4K Projector', 'Logitech MeetUp Video Bar', 'Shure Wireless Mic'],
                        'Software Licenses': ['Adobe Creative Cloud', 'AutoCAD 2024', 'JetBrains All Products']
                    };
                    sharedCategories = ['Vehicles', 'AV Equipment'];
                    i = 0;
                    _h.label = 32;
                case 32:
                    if (!(i < 40)) return [3 /*break*/, 35];
                    cat = getRandomElement(categories);
                    names = assetTemplates[cat.name] || ['Generic Asset'];
                    name_5 = getRandomElement(names);
                    isSharedBookable = sharedCategories.includes(cat.name);
                    return [4 /*yield*/, prisma.asset.create({
                            data: {
                                tag: randomTag('AF'),
                                name: name_5,
                                categoryId: cat.id,
                                status: 'Available',
                                location: "HQ - Floor ".concat(Math.floor(Math.random() * 5) + 1),
                                serialNumber: "SN-".concat(Math.floor(Math.random() * 1000000)),
                                condition: 'Good',
                                acquisitionDate: new Date(Date.now() - Math.random() * 100000000000).toISOString().split('T')[0],
                                acquisitionCost: randomCost(100, 5000),
                                isSharedBookable: isSharedBookable,
                                history: JSON.stringify([])
                            }
                        })];
                case 33:
                    asset = _h.sent();
                    assets.push(asset);
                    _h.label = 34;
                case 34:
                    i++;
                    return [3 /*break*/, 32];
                case 35:
                    nonSharedAssets = assets.filter(function (a) { return !a.isSharedBookable; });
                    i = 0;
                    _h.label = 36;
                case 36:
                    if (!(i < 15 && i < nonSharedAssets.length)) return [3 /*break*/, 39];
                    asset = nonSharedAssets[i];
                    employee = getRandomElement(employees);
                    h = {
                        date: new Date().toISOString(),
                        action: 'Allocated',
                        user: 'System Admin',
                        details: "Allocated to ".concat(employee.name)
                    };
                    return [4 /*yield*/, prisma.asset.update({
                            where: { id: asset.id },
                            data: {
                                status: 'Allocated',
                                assignedTo: employee.id,
                                departmentId: employee.departmentId,
                                history: JSON.stringify([h])
                            }
                        })];
                case 37:
                    _h.sent();
                    _h.label = 38;
                case 38:
                    i++;
                    return [3 /*break*/, 36];
                case 39:
                    sharedAssets = assets.filter(function (a) { return a.isSharedBookable; });
                    if (!(sharedAssets.length > 0)) return [3 /*break*/, 43];
                    i = 0;
                    _h.label = 40;
                case 40:
                    if (!(i < 12)) return [3 /*break*/, 43];
                    asset = getRandomElement(sharedAssets);
                    employee = getRandomElement(employees);
                    isPast = Math.random() > 0.5;
                    startTime = new Date();
                    if (isPast) {
                        startTime.setDate(startTime.getDate() - Math.floor(Math.random() * 10));
                    }
                    else {
                        startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 10));
                    }
                    startTime.setHours(10 + Math.floor(Math.random() * 6), 0, 0, 0);
                    endTime = new Date(startTime);
                    endTime.setHours(startTime.getHours() + 1 + Math.floor(Math.random() * 3));
                    status_1 = 'Upcoming';
                    if (isPast)
                        status_1 = 'Completed';
                    else if (Math.random() > 0.8)
                        status_1 = 'Ongoing';
                    return [4 /*yield*/, prisma.booking.create({
                            data: {
                                assetId: asset.id,
                                employeeId: employee.id,
                                startTime: startTime,
                                endTime: endTime,
                                status: status_1
                            }
                        })];
                case 41:
                    _h.sent();
                    _h.label = 42;
                case 42:
                    i++;
                    return [3 /*break*/, 40];
                case 43:
                    i = 0;
                    _h.label = 44;
                case 44:
                    if (!(i < 10)) return [3 /*break*/, 48];
                    asset = getRandomElement(assets);
                    requester = getRandomElement(employees);
                    statuses = ['Pending', 'Approved', 'In Progress', 'Resolved'];
                    status_2 = getRandomElement(statuses);
                    return [4 /*yield*/, prisma.maintenanceRequest.create({
                            data: {
                                assetId: asset.id,
                                requestedBy: requester.id,
                                issue: 'Routine maintenance check / reported issue',
                                priority: getRandomElement(['Low', 'Medium', 'High']),
                                status: status_2,
                                date: new Date(Date.now() - Math.random() * 10000000000)
                            }
                        })];
                case 45:
                    _h.sent();
                    if (!(status_2 === 'Approved' || status_2 === 'In Progress')) return [3 /*break*/, 47];
                    return [4 /*yield*/, prisma.asset.update({
                            where: { id: asset.id },
                            data: { status: 'Under Maintenance' }
                        })];
                case 46:
                    _h.sent();
                    _h.label = 47;
                case 47:
                    i++;
                    return [3 /*break*/, 44];
                case 48:
                    notificationTypes = ['Allocation', 'Booking', 'Maintenance', 'Alert'];
                    i = 0;
                    _h.label = 49;
                case 49:
                    if (!(i < 15)) return [3 /*break*/, 52];
                    type = getRandomElement(notificationTypes);
                    read = Math.random() > 0.6;
                    text = 'System alert notification.';
                    if (type === 'Allocation')
                        text = "Laptop allocated to ".concat(getRandomElement(employees).name);
                    else if (type === 'Booking')
                        text = "New resource booking created by ".concat(getRandomElement(employees).name);
                    else if (type === 'Maintenance')
                        text = "Maintenance completed for ".concat(getRandomElement(assets).name);
                    return [4 /*yield*/, prisma.notification.create({
                            data: {
                                type: type,
                                text: text,
                                date: new Date(Date.now() - Math.random() * 100000000), // Random recent time
                                read: read
                            }
                        })];
                case 50:
                    _h.sent();
                    _h.label = 51;
                case 51:
                    i++;
                    return [3 /*break*/, 49];
                case 52:
                    console.log('Seeding completed successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
