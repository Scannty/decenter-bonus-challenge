pragma solidity ^0.8.0;

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

contract CDPView {
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

    constructor(address cdpManagerAddr, address vatAddr) {
        cdpManager = CDPManager(cdpManagerAddr);
        vat = Vat(vatAddr);
    }

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
        uint256 adjustedDebt = rate * debt;

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

    function _getProxyOwner(
        address owner
    ) external view returns (address userAddr) {
        DSProxy proxy = DSProxy(owner);
        userAddr = proxy.owner();
    }

    function getCdpManager() external view returns (address) {
        return address(cdpManager);
    }

    function getVat() external view returns (address) {
        return address(vat);
    }
}
