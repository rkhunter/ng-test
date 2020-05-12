import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap, filter } from "rxjs/operators";
import { Image } from "@ks89/angular-modal-gallery";
import { LaunchDetailsFacadeService } from '../services/launch-details-facade.service';
@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsFacade: LaunchDetailsFacadeService
  ) {}

  loaded$ = this.launchDetailsFacade.launchDetailsLoaded$;

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsFacade.pastLaunchDetailsStoreCache(id)),
    filter(x => !!x),
    map(res => ({
      ...res,
      images: res.links.flickr_images.map((x, index) => new Image(
        index, { img: x }
      ))
    }))
  );
}
