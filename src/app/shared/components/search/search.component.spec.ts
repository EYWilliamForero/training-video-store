import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should complement the input's placeholder with the description", () => {
    component.description = 'name';
    fixture.detectChanges();
    let txtSearch = el.query(By.css('#txt-search'));
    expect(txtSearch).toBeTruthy();
    expect(txtSearch.attributes['placeholder']).toEqual('Search by name');
  });

  it('should emit an event when the user type something', () => {
    spyOn(component.search, 'emit');
    component.description = 'name';
    fixture.detectChanges();
    let txtSearch = el.query(By.css('#txt-search'));
    txtSearch.nativeElement.value = 'something';
    txtSearch.triggerEventHandler('input');
    fixture.detectChanges();
    expect(component.search.emit).toHaveBeenCalledOnceWith('something');
  });
});
