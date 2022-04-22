FROM postgres:14.1-alpine

RUN apk --update --no-cache add git make gcc libc-dev clang llvm-dev tzdata geos proj gdal libxml2-dev json-c-dev perl

RUN apk --update --no-cache add geos-dev proj-dev gdal-dev protobuf-c protobuf-c-dev g++

RUN wget https://download.osgeo.org/postgis/source/postgis-3.2.0.tar.gz \
&& tar xvzf postgis-3.2.0.tar.gz \
&& cd postgis-3.2.0 \
&& ./configure --without-protobuf \
&& make \
&& make install

RUN cp /usr/share/zoneinfo/Europe/Kiev /etc/localtime \
&& echo "Europe/Kiev" > /etc/timezone

COPY init_scripts/ /docker-entrypoint-initdb.d

RUN mkdir -p /var/pgconfigs

COPY pgconfigs/ /var/pgconfigs

RUN chown -hR postgres /var

EXPOSE 5432
