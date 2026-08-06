# Makefile for common development tasks

.PHONY: help install migrate run test lint

help:
	@echo "Available targets:"
	@echo "  install  - Create virtualenv and install backend requirements"
	@echo "  migrate  - Run alembic migrations (flask db upgrade)"
	@echo "  run      - Run backend server (Flask)"
	@echo "  test     - Run test suite with pytest"
	@echo "  lint     - Check formatting with black"

install:
	python -m venv .venv
	. .venv/bin/activate && pip install -r backend/requirements.txt

migrate:
	@echo "Make sure .env is configured and database is reachable"
	. .venv/bin/activate && export FLASK_APP=app && flask db upgrade

run:
	. .venv/bin/activate && export FLASK_APP=app && flask run --port=5000

test:
	. .venv/bin/activate && pytest backend/tests

lint:
	. .venv/bin/activate && black --check backend
