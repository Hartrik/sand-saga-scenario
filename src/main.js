
import _ASSET_SAND_PALETTE from "./assets/sand-1.palette.csv";

import _ASSET_ROCK_SM_ICON from './assets/rock-sm-icon.png';
import _ASSET_ROCK_SM_1 from './assets/rock-sm-1.png';

const SandGameJS = window.SandGameJS;
const BrushDefs = window.SandGameJS.BrushDefs;
const Brushes = window.SandGameJS.Brushes;
const ToolDefs = window.SandGameJS.ToolDefs;
const Tools = window.SandGameJS.Tools;
const Scenes = window.SandGameJS.Scenes;

export function init(root, externalConfig) {

    // Learn basics about public API here: https://github.com/Hartrik/sand-game-js#api


    const MY_WATER_BRUSH = Brushes.color(156, 184, 212, BrushDefs.WATER);
    const MY_WATER_TOOL = Tools.roundBrushTool(MY_WATER_BRUSH, ToolDefs.DEFAULT_SIZE, ToolDefs.WATER.getInfo().derive({
        // we will take water defaults...
    }));

    const MY_SAND_1_BRUSH = Brushes.colorPaletteRandom(_ASSET_SAND_PALETTE, BrushDefs.SAND);
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

    const MY_TEMPLATE = Tools.templateSelectionTool([
        {
            info: {
                displayName: "Rock",
                category: "template",
                icon: {
                    imageData: _ASSET_ROCK_SM_ICON
                }
            },
            action: {
                type: "image-template",
                imageData: _ASSET_ROCK_SM_1,
                brush: "rock",
                threshold: 50,
                randomFlipHorizontally: true
            }
        }
    ], ToolDefs.ROCK_TEMPLATES.getInfo().derive({
        codeName: 'templates',
        displayName: 'My templates',
        badgeStyle: {
            backgroundColor: `rgb(127, 46, 246)`,
        }
    }));

    /**
     *
     * @param sandGame {SandGame}
     */
    function buildScene1(sandGame) {

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

    /**
     *
     * @param sandGame {SandGame}
     */
    function buildScene2(sandGame) {
        sandGame.blockTemplate()
            .withMaxHeight(120)
            .withBlueprint([
                '          ',
                '          ',
                '          ',
                '       1  ',
                ' w 111111 ',
                '          ',
                '          ',
            ])
            .withBrushes({
                w: Brushes.withIntensity(0.5, BrushDefs.WATER),
                1: BrushDefs.SAND
            })
            .paint();
    }

    const config = {
        tools: [
            ToolDefs.ERASE,
            ToolDefs.MOVE,
            MY_SAND_1_TOOL,
            MY_SAND_2_TOOL,
            MY_WATER_TOOL,
            ToolDefs.WALL,
            MY_TEMPLATE
        ],

        scenes: {
            scene_1: Scenes.custom('My scene 1', buildScene1),
            scene_2: Scenes.custom('My scene 2', buildScene2)
        },

        primaryTool: MY_SAND_1_TOOL,
        secondaryTool: ToolDefs.ERASE,
        tertiaryTool: ToolDefs.NONE,

        // disableSizeChange: true,
        // disableSceneSelection: true,
    };

    let mergedConfig = {};
    Object.assign(mergedConfig, externalConfig);
    Object.assign(mergedConfig, config);

    return SandGameJS.init(root, mergedConfig);
}
