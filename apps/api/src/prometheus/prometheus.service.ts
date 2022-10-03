import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Gauge, Histogram, Registry } from 'prom-client';
import { SERVICE_NAME } from '../constants';

export type PrometheusHistogram = Histogram<string>;

interface MapHistogram {
  [key: string]: Histogram<string>;
}

interface MapGauge {
  [key: string]: Gauge<string>;
}

@Injectable()
export class PrometheusService {
  private readonly serviceTitle = SERVICE_NAME;
  private readonly servicePrefix = '';
  private readonly registry: Registry;

  private registeredMetrics: MapHistogram = {};
  private registeredGauges: MapGauge = {};

  constructor() {
    this.registry = new Registry();
    this.registry.setDefaultLabels({ app: this.serviceTitle });
    collectDefaultMetrics({ register: this.registry, prefix: this.servicePrefix });
  }

  registerMetrics(name: string, help: string, labelNames: string[], buckets: number[]): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  registerGauge(name: string, help: string): Gauge<string> {
    if (this.registeredGauges[name] === undefined) {
      const gauge = (this.registeredGauges[name] = new Gauge({
        name: this.servicePrefix + name,
        help,
      }));
      this.registry.registerMetric(gauge);
      this.registeredGauges[name] = gauge;
    }
    return this.registeredGauges[name];
  }

  removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }

  metrics(): Promise<string> {
    return this.registry.metrics();
  }
}
