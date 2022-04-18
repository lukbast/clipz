import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  videoOrder = '1'
  clips:IClip[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipsSrv: ClipService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params: Params) =>{
      this.videoOrder = params["sort"] === '2' ? params['sort'] : '1'
    })
    this.clipsSrv.getUserClips().subscribe(docs =>{
      this.clips = []

      docs.forEach(doc =>{
        this.clips.push({...doc.data(), docID: doc.id})
      })
    })
  }

  sort(event: Event){
    const { value } = ( event.target as HTMLSelectElement )

    this.router.navigateByUrl(`/manage?sort=${value}`)
  }

}
