const assert = require('chai').assert;
const oversmash = require('../lib');

const ow = oversmash();
const timeout = 20000;

const battleNetId = 'iddqd-2884';
const region = 'us';
const platform = 'pc';

const lucioBattleNetId = 'DuncaChoc-1812';

describe('Profile', function() {
    this.timeout(timeout);

    it('Should return the correct name', function() {
        return ow.player(battleNetId).then((result) => {
            assert.equal(result.name, battleNetId);
        });
    });

    it('Should return the correct number of accounts', function() {
        return ow.player(battleNetId).then((result) => {
            assert.equal(result.accounts.length, 1);
        });
    });
});

describe('Player Stats', function() {
    this.timeout(timeout);

    it('Should return the correct meta-data', function() {
        return ow.playerStats(battleNetId, region, platform).then((result) => {
            assert.equal(result.name, battleNetId);
            assert.equal(result.region, region);
            assert.equal(result.platform, platform);
        });
    });

    it('Should return a competitive rank', function() {
        return ow.playerStats(battleNetId, region, platform).then((result) => {
            assert(result.stats.competitiveRank > 0);
        });
    });

    it('Should convert non-english characters correctly', function() {
        return ow.playerStats(lucioBattleNetId, region, platform).then((result) => {
            assert(result.stats.competitive.lucio.combat.all_damage_done);
        });
    });
});