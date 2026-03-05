// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {PredictionMarket} from "../src/PredictionMarket.sol";

contract DeployPredictionMarket is Script {
    function run() external returns (PredictionMarket) {
        vm.startBroadcast();
        PredictionMarket market = new PredictionMarket();
        vm.stopBroadcast();
        return market;
    }
}