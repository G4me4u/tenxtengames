
class World {

	constructor(app) {
		this.app = app;

		this.entities = null;

		this.gameOver = false;
		this.wonGame = false;

		this.time = 0;
		this.gameOverAnim = 4;

		this.reset();
	}

	reset() {
		this.entities = [];

		this.gameOver = false;
		this.wonGame = false;

		this.time = 0;
		this.gameOverAnim = 4;
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	removeEntity(entity) {
		const len = this.entities.length;
		for (let i = 0; i < len; i++)
			if (this.entities[i] == entity)
				this.entities.pop(i);
	}

	isColliding(entity, type=ENTITY_UNDEFINED) {
		const udef = type == ENTITY_UNDEFINED;
		for (let ent of this.entities)
			if ((udef || ent.type == type) && ent.collides(entity))
				return ent;
		return null;
	}

	renderEntity(entity) {
		this.app.setPixel(entity.pos.x, entity.pos.y, entity.color);
	}

	renderGame() {
		for (let ent of this.entities)
			this.renderEntity(ent);
	}

	renderGameOver() {
		if (this.time % this.gameOverAnim >= (this.gameOverAnim >> 1))
			return;
		this.app.clear(this.wonGame ? GREEN : RED);
	}

	render() {
		if (this.gameOver) {
			this.renderGameOver();
		} else {
			this.renderGame();
		}
	}
};