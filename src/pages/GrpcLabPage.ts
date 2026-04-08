import { Locator, Page } from "@playwright/test";

export class GrpcLabPage {
    readonly page: Page;
    readonly scenarioSelect: Locator;
    readonly authSelect: Locator;
    readonly portInput: Locator;
    readonly scenarioTitle: Locator;
    readonly scenarioDescription: Locator;
    readonly requiredAuth: Locator;
    readonly selectedAuth: Locator;
    readonly command: Locator;
    readonly expectedResult: Locator;
    readonly reflectionTip: Locator;
    readonly authTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.scenarioSelect = page.getByTestId("grpc-scenario-select");
        this.authSelect = page.getByTestId("grpc-auth-select");
        this.portInput = page.getByTestId("grpc-port-input");
        this.scenarioTitle = page.getByTestId("grpc-scenario-title");
        this.scenarioDescription = page.getByTestId("grpc-scenario-description");
        this.requiredAuth = page.getByTestId("grpc-required-auth");
        this.selectedAuth = page.getByTestId("grpc-selected-auth");
        this.command = page.getByTestId("grpc-command");
        this.expectedResult = page.getByTestId("grpc-expected-result");
        this.reflectionTip = page.getByTestId("grpc-reflection-tip");
        this.authTable = page.getByTestId("grpc-auth-table");
    }

    async open() {
        await this.page.goto("/grpc");
    }

    async selectScenario(scenarioId: string) {
        await this.scenarioSelect.selectOption(scenarioId);
    }

    async selectAuthProfile(profile: string) {
        await this.authSelect.selectOption(profile);
    }

    async setPort(port: string) {
        await this.portInput.fill(port);
    }
}
