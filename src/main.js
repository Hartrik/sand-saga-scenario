
import _ASSET_SAND_PALETTE from "./assets/sand-1.palette.csv"

const SandGameJS = window.SandGameJS;
const BrushDefs = window.SandGameJS.BrushDefs;
const Brushes = window.SandGameJS.Brushes;
const ToolDefs = window.SandGameJS.ToolDefs;
const Tools = window.SandGameJS.Tools;

export function init(root, externalConfig) {

    // Brushes - used to create elements.
    //   We can create custom brushes by extending default brushes from BrushDefs class.
    //   And/or using methods provided by Brushes class.

    // Tools - there are brush tools, template tools, etc.
    //   We can create custom tools using methods provided by Tools class.


    const MY_WATER_BRUSH = Brushes.color(156, 184, 212, BrushDefs.WATER);
    const MY_WATER_TOOL = Tools.roundBrushTool(MY_WATER_BRUSH, ToolDefs.DEFAULT_SIZE, ToolDefs.WATER.getInfo().derive({
        // we will take water default...
    }));

    const MY_SAND_1_BRUSH = Brushes.colorPalette(_ASSET_SAND_PALETTE, BrushDefs.SAND);
    const MY_SAND_1_TOOL = Tools.roundBrushTool(MY_SAND_1_BRUSH, ToolDefs.DEFAULT_SIZE, ToolDefs.SAND.getInfo().derive({
        codeName: 'sand_1',
        badgeStyle: {
            backgroundColor: `rgb(225,161,113)`,
        }
    }));

    const MY_SAND_2_BRUSH = Brushes.color(229, 112, 24, BrushDefs.SAND);
    const MY_SAND_2_TOOL = Tools.roundBrushTool(MY_SAND_2_BRUSH, ToolDefs.DEFAULT_SIZE, ToolDefs.SAND.getInfo().derive({
        codeName: 'sand_2',
        displayName: 'Sand 2',
        badgeStyle: {
            backgroundColor: `rgb(229, 112, 24)`,
        }
    }));

    /**
     *
     * @param sandGame {SandGame}
     * @param controller {Controller}
     */
    function buildScene(sandGame, controller) {

        function seed() {
            return Math.trunc(Math.random() * 1024);
        }

        sandGame.layeredTemplate()
            .layer(30, true, BrushDefs.AIR)
            .layer(10, true, BrushDefs.WALL)
            .layerPerlin([
                { factor: 120, threshold: 0, force: 80, seed: seed() },
                { factor: 30, threshold: 0, force: 10, seed: seed() },
                { factor: 5, threshold: 0, force: 2, seed: seed() },
            ], true, MY_SAND_1_BRUSH);

        sandGame.graphics().drawRectangle(50, 50, 300, 60, BrushDefs.WALL);
    }

    const config = {
        tools: [
            ToolDefs.ERASE,
            ToolDefs.MOVE,
            MY_SAND_1_TOOL,
            MY_SAND_2_TOOL,
            MY_WATER_TOOL,
            ToolDefs.WALL
        ],

        scene: {
            init: buildScene
        },

        primaryTool: MY_SAND_1_TOOL,
        secondaryTool: ToolDefs.ERASE,
        tertiaryTool: ToolDefs.NONE,

        disableSizeChange: true,
        disableSceneSelection: true,
    };

    let mergedConfig = {};
    Object.assign(mergedConfig, externalConfig);
    Object.assign(mergedConfig, config);

    return SandGameJS.init(root, mergedConfig);
}
