import { test, expect } from "../fixtures/baseTest";
import { GrpcLabPage } from "../../src/pages/GrpcLabPage";

test("grpc lab command generation updates with scenario and auth", async ({ page }) => {
    const grpcLab = new GrpcLabPage(page);

    await grpcLab.open();

    await expect(grpcLab.scenarioTitle).toContainText("automation.inventory.v1.InventoryService/GetStock");
    await expect(grpcLab.requiredAuth).toContainText("Required auth: public");
    await expect(grpcLab.selectedAuth).toContainText("Active profile: public");
    await expect(grpcLab.command).toContainText("grpcurl");
    await expect(grpcLab.command).toContainText("localhost:50051");
    await expect(grpcLab.reflectionTip).toContainText("grpcurl -plaintext localhost:50051 list");
    await expect(grpcLab.authTable).toContainText("test-admin-key");

    await grpcLab.selectScenario("admin-snapshot");
    await expect(grpcLab.scenarioDescription).toContainText("Admin-only system state snapshot");
    await expect(grpcLab.requiredAuth).toContainText("Required auth: admin");
    await expect(grpcLab.selectedAuth).toContainText("Active profile: admin");
    await expect(grpcLab.command).toContainText("automation.admin.v1.AdminService/GetSystemSnapshot");
    await expect(grpcLab.command).toContainText("x-api-key: test-admin-key");
    await expect(grpcLab.expectedResult).toContainText("Returns counts for inventory, orders, audit, and notifications.");

    await grpcLab.selectAuthProfile("service");
    await expect(grpcLab.selectedAuth).toContainText("Active profile: service");
    await expect(grpcLab.command).toContainText("x-user-role: service");

    await grpcLab.setPort("51051");
    await expect(grpcLab.command).toContainText("localhost:51051");
    await expect(grpcLab.reflectionTip).toContainText("localhost:51051");
});
