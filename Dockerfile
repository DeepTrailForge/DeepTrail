FROM python:3.10
WORKDIR /app
COPY . .
CMD ["bash", "deeptrail_scripts/start.sh"]