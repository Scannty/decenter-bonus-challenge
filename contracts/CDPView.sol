// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./DSMath.sol";

/* Interfaces */
interface CDPManager {
    function ilks(uint) external view returns (bytes32);

    function owns(uint) external view returns (address);

    function urns(uint) external view returns (address);
}

interface DSProxy {
    function owner() external view returns (address);
}

interface Vat {
    function urns(bytes32, address) external view returns (uint256, uint256);

    function ilks(
        bytes32
    ) external view returns (uint256, uint256, uint256, uint256, uint256);
}

/**
 * @title CDPView Contract
 * @dev This contract provides view functions to retrieve information about MakerDAO's CDPs.
 */
contract CDPView is DSMath {
    struct Information {
        bytes32 ilk;
        address urn;
        address owner;
        address userAddr;
        uint256 collateral;
        uint256 debt;
        uint256 adjustedDebt;
    }

    CDPManager public cdpManager;
    Vat public vat;

    /**
     * @dev Constructor to set the addresses of CDPManager and Vat contracts
     * @param cdpManagerAddr Address of the CDPManager contract
     * @param vatAddr Address of the Vat contract
     */
    constructor(address cdpManagerAddr, address vatAddr) {
        cdpManager = CDPManager(cdpManagerAddr);
        vat = Vat(vatAddr);
    }

    /**
     * @dev Retrieves detailed information about a CDP based on its ID
     * @param _cdpId The ID of the CDP to query
     * @return info Information struct containing details about the CDP
     */
    function getCdpInfo(
        uint256 _cdpId
    ) external view returns (Information memory) {
        // Get the CDP information from the CDP manager contract
        bytes32 ilk = cdpManager.ilks(_cdpId);
        address owner = cdpManager.owns(_cdpId);
        address urn = cdpManager.urns(_cdpId);

        // Determine the user address, if none use the zero address
        address userAddr = address(0);
        try this._getProxyOwner(owner) returns (address user) {
            userAddr = user;
        } catch {}

        // Get collateral and debt of the CDP from the Vat contract
        (uint256 collateral, uint256 debt) = vat.urns(ilk, urn);

        // Get the rate MCD Vat contract and calculate the adjusted debt
        (, uint256 rate, , , ) = vat.ilks(ilk);
        uint256 adjustedDebt = rmul(rate, debt);

        // Store information in a struct and return it
        Information memory info = Information(
            ilk,
            urn,
            owner,
            userAddr,
            collateral,
            debt,
            adjustedDebt
        );
        return info;
    }

    /**
     * @dev Gets the owner of a DSProxy contract
     * @param owner The address of the DSProxy contract owner
     * @return userAddr The address of the DSProxy owner
     */
    function _getProxyOwner(
        address owner
    ) external view returns (address userAddr) {
        DSProxy proxy = DSProxy(owner);
        userAddr = proxy.owner();
    }

    /**
     * @dev Returns the address of the CDPManager contract
     * @return The address of the CDPManager contract
     */
    function getCdpManager() external view returns (address) {
        return address(cdpManager);
    }

    /**
     * @dev Returns the address of the Vat contract
     * @return The address of the Vat contract
     */
    function getVat() external view returns (address) {
        return address(vat);
    }
}
