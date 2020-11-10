"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageNodeApplication = exports.NewUser = exports.PackageKey = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const rest_explorer_1 = require("@loopback/rest-explorer");
const keys_1 = require("./keys");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const models_1 = require("./models");
const sequence_1 = require("./sequence");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const jwt_strategy_1 = require("./authentication-strategies/jwt-strategy");
const hash_password_bcryptjs_1 = require("./services/hash.password.bcryptjs");
const jwt_service_1 = require("./services/jwt-service");
const user_service_1 = require("./services/user-service");
exports.PackageKey = core_1.BindingKey.create('application.package');
const pkg = require('../package.json');
let NewUser = class NewUser extends models_1.User {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUser.prototype, "password", void 0);
NewUser = tslib_1.__decorate([
    repository_1.model()
], NewUser);
exports.NewUser = NewUser;
class StorageNodeApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        this.setUpBindings();
        // Bind authentication component related elements
        this.component(authentication_1.AuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        // authentication
        this.add(core_1.createBindingFromClass(jwt_strategy_1.JWTAuthenticationStrategy));
        // Set up the custom sequence
        this.sequence(sequence_1.MyAuthenticationSequence);
        // Set up the custom sequence
        this.sequence(sequence_1.MyAuthenticationSequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        this.static('/content', path_1.default.join(__dirname, 'content'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    setUpBindings() {
        // Bind package.json to the application context
        this.bind(exports.PackageKey).to(pkg);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService);
        // // Bind bcrypt hash services
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(hash_password_bcryptjs_1.BcryptHasher);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(user_service_1.MyUserService);
    }
}
exports.StorageNodeApplication = StorageNodeApplication;
//# sourceMappingURL=application.js.map