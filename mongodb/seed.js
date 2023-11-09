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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var mongodb_1 = require("mongodb");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, i, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(process.env.DATABASE_URL)];
                case 1:
                    client = _a.sent();
                    db = client.db(process.env.DATABASE_NAME);
                    console.log('Connected successfully to server');
                    console.log('🌱 Seeding Sessions...');
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < 5)) return [3 /*break*/, 5];
                    return [4 /*yield*/, db.collection('sessions').insertOne({
                            id: faker_1.faker.string.uuid(),
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('🌱 Seeding Private Routes...');
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < 10)) return [3 /*break*/, 9];
                    return [4 /*yield*/, db.collection('private-route').insertOne({
                            id: faker_1.faker.string.uuid(),
                            accountName: faker_1.faker.finance.accountName(),
                            accountNumber: faker_1.faker.finance.accountNumber(),
                            amount: faker_1.faker.finance.amount(),
                            currency: faker_1.faker.finance.currencyName(),
                        })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log('🌱 Seeding Public Routes...');
                    i = 0;
                    _a.label = 10;
                case 10:
                    if (!(i < 10)) return [3 /*break*/, 13];
                    return [4 /*yield*/, db.collection('public-route').insertOne({
                            id: faker_1.faker.string.uuid(),
                            name: faker_1.faker.commerce.productName(),
                            description: faker_1.faker.commerce.productDescription(),
                            price: faker_1.faker.commerce.price(),
                            category: faker_1.faker.commerce.department(),
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 10];
                case 13: return [2 /*return*/];
            }
        });
    });
}
seed()
    .catch(function (error) { return console.error(error); })
    .finally(function () { return process.exit(0); });