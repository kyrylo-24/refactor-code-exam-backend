import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { WarningDetails } from '../types/warning.type';
import {
  ProductType,
  ProductFullType,
  Service,
  ServiceFullType,
} from '../types/detailed-warning.type';

@Injectable()
export class WarningsParserService {
  private readonly logger = new Logger(WarningsParserService.name);

  private readonly xmlParser = new XMLParser();

  private readonly productTypeMap: Record<ProductType, ProductFullType> = {
    A: 'Advice',
    B: 'Bundle',
    C: 'Climate',
    D: 'Metadata',
    E: 'Analysis',
    F: 'Forecast',
    M: 'Numerical Weather Prediction',
    O: 'Observation',
    Q: 'Reference',
    R: 'Radar',
    S: 'Special',
    T: 'Satellite',
    W: 'Warning',
    X: 'Mixed',
  };

  private readonly serviceMap: Record<Service, ServiceFullType> = {
    COM: 'Commercial Services',
    HFW: 'Flood Warning Service',
    TWS: 'Tsunami Warning Services',
    WAP: 'Analysis and Prediction',
    WSA: 'Aviation Weather Services',
    WSD: 'Defence Weather Services',
    WSF: 'Fire Weather Services',
    WSM: 'Marine Weather Services',
    WSP: 'Public Weather Services',
    WSS: 'Cost Recovery Services',
    WSW: 'Disaster Mitigation',
  };

  parseWarning(warning: string): Omit<WarningDetails, 'text'> {
    const json = this.xmlParser.parse(warning);

    const productType = this.productTypeMap[json.amoc['product-type']];

    if (!productType) {
      this.logger.error(`Product type ${json.amoc['product-type']} not found`);
      throw new InternalServerErrorException(
        `Product type ${json.amoc['product-type']} not found`,
      );
    }

    const service = this.serviceMap[json.amoc['service']];

    if (!service) {
      this.logger.error(`Service ${json.amoc['service']} not found`);
      throw new InternalServerErrorException(
        `Service ${json.amoc['service']} not found`,
      );
    }

    const issueTime = json.amoc['issue-time-utc']?.[0];
    const expiryTime = json.amoc['expiry-time']?.[0];

    return {
      productType,
      service,
      start: issueTime,
      expiry: expiryTime,
    };
  }
}
